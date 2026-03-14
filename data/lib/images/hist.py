from typing import Callable, TypedDict

import numpy as np

from pathlib import Path

from PIL import Image

from lib.schema import NamedColor
from lib.images.distance import DistanceFunc, manhattan_rgb_distance
from lib.images.colors import COLORS

class HistogramOptions(TypedDict, total=False):
  distance_func: DistanceFunc | None
  ignore_alpha: bool
  image_output: Path | None

from scipy.ndimage import gaussian_filter

def soften_alpha_weights(alpha: np.ndarray, sigma: float = 1.0, strength: float = 3.0) -> np.ndarray:
  """
  Reduce the weight of pixels near transparent areas.
  
  Args:
      alpha: 2D array of alpha values normalized [0,1]
      sigma: Gaussian blur sigma

  Returns:
      adjusted_weights: 2D array same shape as alpha
  """
  # Apply a Gaussian blur to the alpha mask
  blurred = gaussian_filter(alpha, sigma=sigma)
  blurred_exp = blurred ** strength

  # Take the minimum of original and blurred
  adjusted = np.minimum(alpha, blurred_exp)
  return adjusted

def get_image_histogram(
  image: Image.Image, 
  buckets: list[NamedColor] = COLORS,
  *,
  distance_func: DistanceFunc | None = None,
  ignore_alpha = False, 
  image_output: Path | None = None
) -> list[tuple[NamedColor, float]]:
  resolved_distance_func = distance_func or manhattan_rgb_distance
  image = image.convert("RGBA")

  image_array = np.asarray(image, dtype=np.int16)  # int16 avoids overflow
  h, w = image_array.shape[:2]
  channels = 1 if len(image_array.shape) < 3 else image_array.shape[2]
  if channels == 1:
    print(f"WARNING: {channels=} (shape={image_array.shape}) for image {image.info}")

  rgb = image_array[..., :3] # (h, w, 3)
  alpha = image_array[..., 3] if channels == 4 else None

  bucket_rgb = np.array([b.rgb for b in buckets], dtype=np.int16)  # (B, 3)
  B = bucket_rgb.shape[0]

  delta = resolved_distance_func(rgb, bucket_rgb)

  # find the closest bucket
  bucket_idx: np.ndarray = np.argmin(delta, axis=-1)  # (h, w)

  if alpha is None or ignore_alpha:
    weights = np.ones((h, w), dtype=np.float32)
  else:
    alpha_norm = alpha.astype(np.float32) / 255
    weights = soften_alpha_weights(alpha_norm, sigma=1, strength=5)

  try:
    hist = np.bincount(
      bucket_idx.ravel(),
      weights=weights.ravel(),
      minlength=B
    )
  except Exception as err:
    print(f"Error calculating histogram for image of size {image_array.shape} with {B} buckets ({bucket_idx.shape=})", err)
    return []

  if image_output:
    bucket_colors = bucket_rgb[bucket_idx].astype(np.uint8)
    alpha_channel = (weights * 255).astype(np.uint8)
    out = np.dstack([bucket_colors, alpha_channel])
    Image.fromarray(out, "RGBA").save(image_output)

  raw_data = [(buckets[i], float(hist[i])) for i in range(B)]
  return sorted(raw_data, key=lambda a: -a[1])
