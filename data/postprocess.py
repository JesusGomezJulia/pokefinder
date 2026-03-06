import json

from tqdm import tqdm

from transform import COLOR_MAP, HABITAT_MAP
from contracts import ExtraPokemon, Pokemon, Species

def postprocess(input_file, extra_file, output_file):
  with open(input_file, 'r') as f:
    data = json.load(f)
    pokedex = {key: Pokemon.model_validate(value) for key, value in data.items()}

  with open(extra_file, 'r') as f:
    extra_data = json.load(f)["data"]["species"]
    extra = {item["id"]: Species.model_validate(item) for item in extra_data}

  for pokemon in tqdm(pokedex.values()):
    if pokemon.num in extra:
      species = extra[pokemon.num]

      normalized_name = normalize_name(pokemon.name)
      pokemon_data = find_pokemon(normalized_name, pokemon, species.pokemons) if len(species.pokemons) > 1 else species.pokemons[0]

      if not pokemon_data:
        available_names = [extra_pokemon.name for extra_pokemon in species.pokemons]
        print(f"Warning: No matching pokemon data found for {pokemon.name} (num: {pokemon.num}). Available names: {', '.join(available_names)}")

      if pokemon_data is not None and pokemon_data.pokemonsprites is not None:
        pokemon.thumbnailUrl = pokemon_data.pokemonsprites[0].sprites.front_default

      #species_color = COLOR_MAP.get(species.pokemon_color_id)
      #if species_color != pokemon.color:
      #  pokemon.secondary_color = species_color

      species_habitat = HABITAT_MAP.get(species.pokemon_habitat_id)
      pokemon.habitat = species_habitat

      species_generation = species.generation.name
      pokemon.generation = species_generation

  data = {key: pokemon.model_dump() for key, pokemon in pokedex.items()}
  with open(output_file, 'w') as f:
    json.dump(data, f, indent=2)

OVERRIDES = {
  "Greninja-Bond": "greninja-battle-bond",
  "Aegislash": "aegislash-shield",
  "Wormadam": "wormadam-plant",
  "Giratina": "giratina-altered",
  "Shaymin": "shaymin-land",
  "Basculin": "basculin-red-striped",
  "Meloetta": "meloetta-aria",
  "Oricorio": "oricorio-baile",
  "Lycanroc": "lycanroc-midday",
  "Zygarde": "zygarde-50",
  "Wishiwashi": "wishiwashi-solo",
  "Minior": "minior-red",
  "Minior-Meteor": "minior-red-meteor",
  "Mimikyu": "mimikyu-disguised",
  "Mimikyu-Totem": "mimikyu-disguised",
  "Necrozma-Dusk-Mane": "necrozma-dusk",
  "Necrozma-Dawn-Wings": "necrozma-dawn",
  "Toxtricity": "toxtricity-amped",
  "Eiscue": "eiscue-ice",
  "Morpeko": "morpeko-full-belly",
  "Urshifu": "urshifu-single-strike",
  "Maushold": "maushold-family-of-three",
  "Maushold-Four": "maushold-family-of-four",
  "Palafin": "palafin-zero",
  "Dudunsparce": "dudunsparce-two-segment",
  "Tatsugiri": "tatsugiri-curly",
  "Squawkabilly": "squawkabilly-green",
  "Ogerpon-Teal": "ogerpon",
}

def normalize_name(name: str):
  if name in OVERRIDES:
    return OVERRIDES[name]
  return name.lower().replace(" ", "-").replace(".", "").replace("'", "").replace("%", "").replace(":", "").replace("-totem", "")

STANDARD_SUFFIXES= ["", "-male", "emale", "-cap", "-breed", "-normal", "-standard", "-incarnate", "-ordinary", "-average", "-plumage", "-mask"]
def find_pokemon(normalized_name: str, original: Pokemon, pokemons: list[ExtraPokemon]) -> ExtraPokemon | None:
  name_map = {extra_pokemon.name: extra_pokemon for extra_pokemon in pokemons}
  if normalized_name in name_map:
    return name_map[normalized_name]

  for infix in STANDARD_SUFFIXES:
    infixed_name = f"{normalized_name}{infix}"
    if infixed_name in name_map:
      return name_map[infixed_name]
  for suffix in ["-Gmax", "-Tera"]:
    if not original.name.endswith(suffix):
      continue
    stripped_name = normalize_name(original.name[:-len(suffix)])
    for infix in STANDARD_SUFFIXES:
      renormalized_name = f"{stripped_name}{infix}{suffix.lower()}"
      if renormalized_name in name_map:
        return name_map[renormalized_name]
    for infix in STANDARD_SUFFIXES:
      renormalized_name = f"{stripped_name}{infix}"
      if renormalized_name in name_map:
        return name_map[renormalized_name]
  return None 

if __name__ == "__main__":
  postprocess(
    "in/pokemon.json",
    "in/extra-data.json",
    "out/pokemon.json"
  )