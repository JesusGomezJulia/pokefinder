import asyncio
from concurrent.futures import ThreadPoolExecutor, as_completed
import os
from pathlib import Path
from typing import Callable

from tqdm import tqdm
from tqdm.asyncio import tqdm_asyncio
from PIL import Image

from lib.schema import NamedColor
from lib.images.distance import DistanceFunc
from lib.images.colors import COLORS
from lib.images.hist import get_image_histogram
from lib.images.fetch import image_cache

semaphore = asyncio.Semaphore(10) # max simultaneous fetches
async def fetch_files(image_urls: list[str]):
  async def wrapper(url: str) -> tuple[str, Path | None]:
    async with semaphore:
      path = await image_cache.fetch(url)
    return (url, path)
  
  image_urls = list(set(image_urls)) # dedupe
  print(f"Fetching {len(image_urls)} files")
  tasks = (wrapper(url) for url in image_urls)
  results: list[tuple[str, Path | None]] = await tqdm_asyncio.gather(*tasks)
  return { url: path for url, path in results }

async def get_cached_images(image_urls: list[str]):
  async def wrapper(url: str) -> tuple[str, Path | None]:
    path = await image_cache.get(url)
    return (url, path)
  
  image_urls = list(set(image_urls)) # dedupe
  print(f"Reading {len(image_urls)} Images from cache")
  tasks = (wrapper(url) for url in image_urls)
  results: list[tuple[str, Path | None]] = await tqdm_asyncio.gather(*tasks)
  return { url: path for url, path in results }

Visualizer = Callable[[Path, str], Path | None] | None
def get_histograms(
  images: list[tuple[str, Path]], 
  buckets = COLORS, 
  *, 
  quiet = False,
  workers: int | None = None,
  visualizer: Visualizer = None,
  distance_func: DistanceFunc | None = None
):
  def process(img: tuple[str, Path]) -> tuple[str, list[tuple[NamedColor, float]]]:
    input_url, input_path = img
    out_path = None
    if visualizer:
      out_path = visualizer(input_path, input_url)
    try:
      with Image.open(input_path) as image:
        result = get_image_histogram(image, buckets, distance_func=distance_func, image_output=out_path)
      return input_url, result
    except Exception as e:
      if not quiet:
        print(f"Failed to process histogram for {input_path}", e)
      return input_url, []

  histograms = {}
  with ThreadPoolExecutor(max_workers=workers) as executor:
    futures = [executor.submit(process, img) for img in images]

    for future in tqdm(as_completed(futures), total=len(futures)):
      url, hist = future.result()
      histograms[url] = hist

  return histograms

async def get_histograms_from_urls(
  urls: list[str],
  buckets = COLORS, 
  *, 
  quiet = False,
  refetch = False,
  visualizer: Visualizer = None,
  distance_func: DistanceFunc | None = None
): 
  images = await (fetch_files(urls) if refetch else get_cached_images(urls))
  filtered = [(url, path) for url, path in images.items() if path != None]
  return get_histograms(filtered, buckets, quiet=quiet, visualizer=visualizer, distance_func=distance_func)
  
def default_visualizer(path: Path, _url: str) -> Path:
  filename = path.name
  name, ext = os.path.splitext(filename)
  new_path = path.with_name(f"{name}.hist{ext}")
  return new_path
