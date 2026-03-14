import argparse
import asyncio
import json
import os
import pathlib
from typing import Literal

from lib.images.colors import COLORS
from lib.images.distance import ciede2000_distance
from lib.images.process import default_visualizer, get_histograms_from_urls
from lib.transform.pokemon import enrich_colors, process_pokemon
from lib.schema import CategoryData, ColorData, ColorHistogramItem, PokeAPIQueryData, SpriteColorData

ColorCalcMode = Literal['none', 'cache', 'fetch']
COLOR_CALC_CHOICES: list[ColorCalcMode] = ['none', 'cache', 'fetch']

color_file = pathlib.Path('meta/colors.json')
async def main(input_file: str, *, commit_to="out/pokedex.json", calc_colors: ColorCalcMode = 'none'):
  with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)["data"]
    pokedex = PokeAPIQueryData.model_validate(data)

  with open("in/categories.json", 'r', encoding='utf-8') as f:
    data = json.load(f)
    categories = CategoryData.model_validate(data)

  result = process_pokemon(pokedex, categories)
  if calc_colors != 'none':
    refetch = calc_colors == 'fetch'
    urls = [p.spriteUrl for p in result if p.spriteUrl]
    hist_data = await get_histograms_from_urls(urls, refetch=refetch, visualizer=default_visualizer, distance_func=ciede2000_distance)
    color_file.parent.mkdir(exist_ok = True)
    with open(color_file, 'w') as f:
      data = ColorData(
        colors=COLORS,
        urls={url: SpriteColorData(histogram=[
          ColorHistogramItem(color=color.name, weight=weight) for color, weight in data
        ]) for url, data in hist_data.items()}
      )
      raw_data = data.model_dump()
      json.dump(raw_data, f, indent=2)

  if color_file.exists():
    with open(color_file, 'r') as f:
      data = json.load(f)
      colors = ColorData.model_validate(data)
    enrich_colors(result, colors)

  result_json = [pokemon.model_dump() for pokemon in result]
  
  commit_dir = pathlib.Path(os.path.dirname(commit_to))
  commit_dir.mkdir(parents = True, exist_ok = True)
  with open(commit_to, "w") as f:
    json.dump(result_json, f, indent=2)

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument("-i", "--in", help="The input json file containing the pokemon data", default="in/full.json", dest="in_path")
  parser.add_argument("-o", "--out", help="The output json file to write the results to", default="out/pokedex.json", dest="out_path")
  parser.add_argument("--commit", action="store_true", help="Equivalent to --out pointing to the webapp's data file", dest="auto_commit")
  parser.add_argument("-c", "--colors", "--calc-colors", choices=COLOR_CALC_CHOICES, help="Recalculate the colors for each pokemon, 'cache' will use locally stored images (which you must fetch at least once), 'fetch' will redownload all sprite data", default="none", dest="calc_colors")

  result = parser.parse_args()
  if result.auto_commit:
    result.out_path = "../pokefinder/public/data/pokedex.json"

  coroutine = main(result.in_path, commit_to=result.out_path, calc_colors=result.calc_colors)
  asyncio.run(coroutine)
