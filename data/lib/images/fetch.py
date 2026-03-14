from pathlib import Path

from lib.images.cache import HttpFileCache

images_dir = Path("temp/images")
images_dir.mkdir(parents=True, exist_ok=True)

image_cache = HttpFileCache(images_dir)
