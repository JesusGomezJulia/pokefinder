import asyncio
from collections import defaultdict
import hashlib
import os
from pathlib import Path
from urllib.parse import urlparse

import httpx
import aiosqlite

class HttpFileCache:
  def __init__(self, root: Path):
    self.root = root
    self.db_path = root / "cache.db"
    self.data_dir = root / "data"

    self.data_dir.mkdir(parents=True, exist_ok=True)
    
    self._locks: dict[str, asyncio.Lock] = defaultdict(asyncio.Lock)

    self.client = httpx.AsyncClient()
    self.db: aiosqlite.Connection | None = None

  async def init(self):
    self.db = await aiosqlite.connect(self.db_path)

    await self.db.execute(
      """
      CREATE TABLE IF NOT EXISTS cache (
        url TEXT PRIMARY KEY,
        path TEXT NOT NULL,
        etag TEXT,
        last_modified TEXT
      )
      """
    )

    await self.db.commit()
    
  async def close(self):
    if self.db:
      await self.db.close()
    await self.client.aclose()

  async def _ensure_db(self):
    if self.db:
      return self.db
    await self.init()
    if not self.db:
      raise Exception("Database initialization failed")
    return self.db

  def _filename_from_url(self, url: str) -> str:
    _file, ext = os.path.splitext(urlparse(url).path)
    h = hashlib.sha256(url.encode()).hexdigest()
    return f"{h}{ext}"

  async def _get_entry(self, url: str):
    db = await self._ensure_db()
    async with db.execute(
      "SELECT path, etag, last_modified FROM cache WHERE url = ?", (url,)
    ) as cursor:
      return await cursor.fetchone()
    
  async def get(self, url: str):
    entry = await self._get_entry(url)
    if not entry:
      return None
    
    path, _etag, _last_modified = entry
    return Path(path)
    
  async def get_files(self):
    db = await self._ensure_db()
    async with db.execute(
      "SELECT url, path FROM cache"
    ) as cursor:
      data = await cursor.fetchall()
    result = [(str(url), Path(path)) for url, path in data]
    return result

  async def _set_entry(self, url: str, path: str, etag: str | None, last_modified: str | None):
    db = await self._ensure_db()
    await db.execute(
      """
      INSERT INTO cache(url, path, etag, last_modified)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(url) DO UPDATE SET
        path=excluded.path,
        etag=excluded.etag,
        last_modified=excluded.last_modified
      """,
        (url, path, etag, last_modified),
    )
    await db.commit()

  def get_url_path(self, url: str) -> Path:
    filename = self._filename_from_url(url)
    return self.data_dir / filename

  async def fetch(self, url: str) -> Path | None:
    lock = self._locks[url]

    async with lock:
      entry = await self._get_entry(url)

      headers = {}
      existing_path: Path | None = None

      if entry:
        path, etag, last_modified = entry
        existing_path = Path(path)

        if etag:
          headers["If-None-Match"] = etag

        if last_modified:
          headers["If-Modified-Since"] = last_modified

      response = await self.client.get(url, headers=headers)

      # 304 → file unchanged
      if response.status_code == 304 and existing_path and existing_path.exists():
        return existing_path
      if response.status_code == 404:
        if existing_path and existing_path.exists():
          return existing_path
        return None

      response.raise_for_status()
      content_type = response.headers.get("content-type", "")
      if not content_type.startswith("image/"):
        raise ValueError(f"URL did not return an image: {url} ({content_type})")

      dest_path = self.get_url_path(url)

      # atomic write
      tmp = dest_path.with_suffix(".tmp")
      tmp.write_bytes(response.content)
      tmp.replace(dest_path)

      etag = response.headers.get("etag")
      last_modified = response.headers.get("last-modified")

      await self._set_entry(url, str(dest_path), etag, last_modified)

      return dest_path
