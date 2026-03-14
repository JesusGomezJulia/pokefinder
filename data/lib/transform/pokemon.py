from collections import defaultdict
from typing import cast

from tqdm import tqdm

from contracts import AbilityKey, PokemonContract
from lib.constants import REGIONS
from lib.transform.utils import map_gender_ratio
from lib.schema import Ability, CategoryData, ColorData, ColorHistogramItem, PokeAPIQueryData, Pokemon, PokemonAbility, PokemonForm, Species, SpriteColorData

def process_pokemon(pokedex: PokeAPIQueryData, categories: CategoryData):
  ultrabeast_set = set(categories.ultrabeast)
  paradox_set = set(categories.paradox)

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
    stage = get_stage(s, species_map)

    is_ultrabeast = s.name in ultrabeast_set
    is_paradox = s.name in paradox_set

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
        ) or id_to_name(f.name)

        main_sprite = get_sprite_or_default(s, p, f)

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
          stage = stage,
          baseForm = species_id,
          siblingForms = siblings,
          isBase = f.name == species_id,
          isMega = "mega" in f.form_name,
          isGmax = "gmax" in f.form_name,
          isTera =  "tera" in f.form_name,
          isTotem = "totem" in f.form_name,
          isMythical = s.is_mythical,
          isLegendary = s.is_legendary,
          isUltrabeast = is_ultrabeast,
          isParadox = is_paradox,
          isBaby = s.is_baby,
        )
        result.append(new_pokemon)
  
  return result

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

def id_to_name(id:str):
  return id.replace("-", " ").title()

def get_sprite_or_default(species: Species, pokemon: Pokemon, form: PokemonForm):
  main_sprite = form.pokemonformsprites[0].sprites.front_default
  if main_sprite:
    return main_sprite
  for f_other in pokemon.pokemonforms:
    main_sprite = f_other.pokemonformsprites[0].sprites.front_default
    if main_sprite:
      print(f"  Found sprite in sibling form {f_other.name}")
      return main_sprite
  for p_other in species.pokemons:
    for f_other in p_other.pokemonforms:
      main_sprite = f_other.pokemonformsprites[0].sprites.front_default
      if main_sprite:
        print(f"  Found sprite in sibling pokemon {p_other.name} form {f_other.name}")
        return main_sprite
  return None

def get_stage(species: Species, map: dict[int, Species]):
  prevo_id = species.evolves_from_species_id
  if prevo_id == None:
    return 1
  else:
    prevo = map[prevo_id]
    return 1 + get_stage(prevo, map)

def enrich_colors(pokemon_data: list[PokemonContract], color_data: ColorData) -> None:
  url_map = color_data.urls
  for p in pokemon_data:
    colors = get_pokemon_colors(p, url_map)
    p.colors = colors

def get_pokemon_colors(pokemon: PokemonContract, url_map: dict[str, SpriteColorData]):
  if not pokemon.spriteUrl: return []
  sprite_color = url_map.get(pokemon.spriteUrl)
  if not sprite_color: return []

  histogram = preprocess_histogram(sprite_color.histogram)
  if len(histogram) < 1: return []
  top_color, top_weight = histogram[0]

  if len(histogram) < 2: return [top_color]
  second_color, second_weight = histogram[1]

  if second_weight < top_weight / 3:
    return [top_color]
  return [top_color, second_color]

color_collapse = {
  "cyan": "blue",
  "lime": "green"
}
def preprocess_histogram(histogram: list[ColorHistogramItem]):
  tally: dict[str, float] = defaultdict(float)
  for item in histogram:
    norm_name = item.color.lower()
    if norm_name in color_collapse:
      norm_name = color_collapse[norm_name]
    tally[norm_name] += item.weight
  return sorted(tally.items(), key=lambda c: -c[1])
