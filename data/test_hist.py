import argparse
import glob
from typing import Literal
from pathlib import Path

from PIL import Image

from lib.images.distance import DistanceFunc, adaptive_distance, ciede2000_distance, hue_weighted_distance, manhattan_rgb_distance, perceptual_distance
from lib.images.hist import get_image_histogram
from lib.images.colors import COLOR_MAP

import re

def normalize_path(path: str):
  return path.replace('\\', '/')

def make_glob_matcher(pattern: str):
  regex = re.escape(normalize_path(pattern)).replace(r"\*", "(.*)")
  regex = f"^{regex}$"
  return re.compile(regex)

DistanceType = Literal["manhattan", "perceptual", "hue", "adaptive", "de2000"]
DistanceChoice = DistanceType | Literal["all"]

DIST_FUNCS: dict[DistanceType, DistanceFunc] = {
  "manhattan": manhattan_rgb_distance,
  "perceptual": perceptual_distance,
  "adaptive": adaptive_distance,
  "hue": hue_weighted_distance,
  "de2000": ciede2000_distance,
}
DIST_CHOICES: list[DistanceChoice] = [*DIST_FUNCS.keys(), "all"]


def run_single(in_path: str, out_path: str, distance: DistanceType):
  image = Image.open(in_path).convert("RGBA")
  buckets = list(COLOR_MAP.values())

  distance_func = DIST_FUNCS[distance]

  hist = get_image_histogram(
    image,
    buckets,
    image_output=Path(out_path),
    distance_func=distance_func,
  )

  print(f"\n[{distance}] {in_path}")
  print("Histogram:")
  for color, weight in hist:
    print(f"{color.name:>12}: {weight:.3f}")


def run(in_path: str, out_path: str, distance: DistanceType):
  distances: list[DistanceType] = list(DIST_FUNCS.keys()) if distance == "all" else [distance]

  in_is_glob = "*" in in_path
  out_is_glob = "*" in out_path
  
  matcher = make_glob_matcher(in_path) if in_is_glob else None

  if in_is_glob:
    inputs = sorted(glob.glob(in_path))
    if not inputs:
      raise ValueError(f"No files matched glob: {in_path}")
  else:
    inputs = [in_path]

  for input_file in inputs:

    input_path = Path(input_file)
    stem = input_path.stem

    if in_is_glob and out_is_glob and matcher:
      match = matcher.match(normalize_path(input_file))
      if not match:
        raise RuntimeError(f"Could not match {input_file} against pattern {in_path}")

      replacement = match.group(1)
      output_base = out_path.replace("*", replacement)
    elif out_is_glob:
      output_base = out_path.replace("*", stem)
    else:
      output_base = out_path

    for dist in distances:
      if distance == "all":
        p = Path(output_base)
        output_file = str(p.with_name(f"{p.stem}.{dist}{p.suffix}"))
      else:
        output_file = output_base

      Path(output_file).parent.mkdir(parents=True, exist_ok=True)

      run_single(input_file, output_file, dist)


if __name__ == "__main__":
  parser = argparse.ArgumentParser()

  parser.add_argument(
    "-i",
    "--in",
    help="Input image file or glob",
    default="in.png",
    dest="in_path",
  )

  parser.add_argument(
    "-o",
    "--out",
    help="Output visualization image or glob",
    default="out.png",
    dest="out_path",
  )

  parser.add_argument(
    "-d",
    "--dist",
    "--distance",
    help="Distance mode",
    choices=DIST_CHOICES,
    default="manhattan",
    dest="distance",
  )

  args = parser.parse_args()

  run(args.in_path, args.out_path, args.distance)