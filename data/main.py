import json
from typing import cast

from tqdm import tqdm

from contracts import AbilityKey, PokemonContract
from transform import map_gender_ratio
from schema import Ability, PokeAPIQueryData, PokemonAbility, Species

REGIONS = { "galar", "paldea", "alola", "hisui" }

def main(input_file: str):
  with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)["data"]
    pokedex = PokeAPIQueryData.model_validate(data)
  
  species = pokedex.pokemonspecies
  species_map = { s.id: s for s in species }
  type_map = { t.id: t for t in pokedex.type }
  generation_map = { g.id: g for g in pokedex.generation }
  habitat_map = { h.id: h for h in pokedex.pokemonhabitat }
  color_map = { c.id: c for c in pokedex.pokemoncolor }
  shape_map = { s.id: s for s in pokedex.pokemonshape }

  abilities = pokedex.ability
  ability_map = { a.id: a for a in abilities }

  result: list[PokemonContract] = []
  for s in tqdm(species):
    species_name = s.pokemonspeciesnames[0].name
    species_id = get_species_id(s)
    habitat = habitat_map.get(s.pokemon_habitat_id or -1)
    habitats = [habitat.name] if habitat else []

    all_forms = [f.name for p in s.pokemons for f in p.pokemonforms]

    prevo = species_map.get(s.evolves_from_species_id or -1)
    evos = [other for other in species if other.evolves_from_species_id == s.id]
    prevo_id = get_species_id(prevo) if prevo else None
    evo_ids = [get_species_id(s) for s in evos]

    for p in s.pokemons:
      types = [type_map[t.type_id].name for t in p.pokemontypes]
      abilities = build_ability_dict(p.pokemonabilities, ability_map)
      generation = generation_map.get(s.generation_id)
      gen_name = generation.name if generation else "unknown"
      shape = shape_map.get(s.pokemon_shape_id or -1)
      shape_name = shape.name if shape else None

      for f in p.pokemonforms:
        name = (
          f.pokemonformnames[0].pokemon_name 
            if f.pokemonformnames 
            else species_name
        )
        main_sprite = f.pokemonformsprites[0].sprites.front_default
        siblings = all_forms.copy()
        siblings.remove(f.name)

        new_pokemon = PokemonContract(
          num = s.id,
          id = f.name,
          name = name,
          types = types,
          region = f.form_name if f.form_name in REGIONS else None,
          form = f.form_name,
          generation = gen_name,
          genderRatio = map_gender_ratio(s.gender_rate),
          colors = [],
          shape = shape_name,
          abilities = abilities,
          habitats = habitats,
          spriteUrl  =  main_sprite,
          evolvesFrom = prevo_id,
          evolutions = evo_ids,
          baseForm = species_id,
          siblingForms = siblings,
          isBase = f.name == species_id,
          isMega = f.form_name == "mega",
          isGmax = f.form_name == "gmax",
          isTera = f.form_name == "terastal",
          isTotem = f.form_name == "totem",
          isMythical = s.is_mythical,
          isLegendary = s.is_legendary,
          isUltrabeast = False,
          isParadox = False,
          isBaby = False
        )
        result.append(new_pokemon)

  result_json = [pokemon.model_dump() for pokemon in result]
  
  with open("out/pokedex.json", "w") as f:
    json.dump(result_json, f, indent=2)

def get_species_id(species: Species):
  for p in species.pokemons:
    if not p.is_default:
      continue
    for f in p.pokemonforms:
      if not p.is_default:
        continue
      return f.name
    return p.name
  return species.name

def build_ability_dict(abilities: list[PokemonAbility], data_map: dict[int, Ability]):
  result: dict[AbilityKey, str] = {}
  for ability in abilities:
    key = "H" if ability.is_hidden else f"{ability.slot - 1}"
    ability_data = data_map.get(ability.ability_id)
    if ability_data:
      result[cast(AbilityKey, key)] = ability_data.name
  return result

if __name__ == "__main__":
  main("in/full.json")
