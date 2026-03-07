import json

from contracts import PokeAPIQueryData

def main(input_file: str):
  with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)["data"]
    pokedex = PokeAPIQueryData.model_validate(data)
    print(pokedex.model_dump().keys())

if __name__ == "__main__":
    main("in/full.json")
