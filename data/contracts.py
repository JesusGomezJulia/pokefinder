from typing import Any, Literal
from pydantic import BaseModel, ConfigDict


class EffectText(BaseModel):
  effect: str

  model_config = ConfigDict(extra="ignore")


class FlavorText(BaseModel):
  flavor_text: str

  model_config = ConfigDict(extra="ignore")


class Ability(BaseModel):
  id: int
  name: str
  abilityeffecttexts: list[EffectText]
  abilityflavortexts: list[FlavorText]

  model_config = ConfigDict(extra="ignore")


class PokemonColor(BaseModel):
  id: int
  name: str

  model_config = ConfigDict(extra="ignore")


class PokemonHabitat(BaseModel):
  id: int
  name: str

  model_config = ConfigDict(extra="ignore")


class PokemonShape(BaseModel):
  id: int
  name: str

  model_config = ConfigDict(extra="ignore")


class Generation(BaseModel):
  id: int
  name: str

  model_config = ConfigDict(extra="ignore")


class Type(BaseModel):
  id: int
  name: str

  model_config = ConfigDict(extra="ignore")


class Sprites(BaseModel):
  front_default: str | None = None
  other: dict[str, Any] | None = None

  model_config = ConfigDict(extra="ignore")


class PokemonFormSprites(BaseModel):
  id: int
  sprites: dict[str, Any]

  model_config = ConfigDict(extra="ignore")


class PokemonFormType(BaseModel):
  id: int
  type_id: int

  model_config = ConfigDict(extra="ignore")


class PokemonFormName(BaseModel):
  name: str
  pokemon_name: str

  model_config = ConfigDict(extra="ignore")


class PokemonForm(BaseModel):
  id: int
  name: str
  order: int
  form_name: str
  form_order: int
  is_battle_only: bool
  is_default: bool
  is_mega: bool

  pokemonformsprites: list[PokemonFormSprites]
  pokemonformtypes: list[PokemonFormType]
  pokemonformnames: list[PokemonFormName]

  model_config = ConfigDict(extra="ignore")


class PokemonAbility(BaseModel):
  id: int
  ability_id: int
  slot: int
  is_hidden: bool

  model_config = ConfigDict(extra="ignore")


class PokemonType(BaseModel):
  id: int
  type_id: int

  model_config = ConfigDict(extra="ignore")


class PokemonStat(BaseModel):
  id: int
  stat_id: int
  base_stat: int

  model_config = ConfigDict(extra="ignore")


class Pokemon(BaseModel):
  id: int
  name: str
  height: int
  order: int
  is_default: bool

  pokemonabilities: list[PokemonAbility]
  pokemonforms: list[PokemonForm]
  pokemontypes: list[PokemonType]
  pokemonstats: list[PokemonStat]

  model_config = ConfigDict(extra="ignore")


class PokemonSpeciesName(BaseModel):
  id: int
  name: str
  genus: str

  model_config = ConfigDict(extra="ignore")


class Species(BaseModel):
  id: int
  name: str

  is_mythical: bool
  is_legendary: bool
  is_baby: bool

  gender_rate: int | None
  evolves_from_species_id: int | None

  generation_id: int
  pokemon_color_id: int | None
  pokemon_habitat_id: int | None
  pokemon_shape_id: int | None

  pokemons: list[Pokemon]
  pokemonspeciesnames: list[PokemonSpeciesName]

  model_config = ConfigDict(extra="ignore")


class PokeAPIQueryData(BaseModel):
  pokemonspecies: list[Species]
  pokemoncolor: list[PokemonColor]
  pokemonhabitat: list[PokemonHabitat]
  pokemonshape: list[PokemonShape]
  ability: list[Ability]
  generation: list[Generation]
  type: list[Type]

  model_config = ConfigDict(extra="ignore")

class PokemonLegacy(BaseModel):
  num: int
  name: str
  types: list[str]
  genderRatio: dict | None = None
  gender: str | None = None
  baseStats: dict | None = None
  abilities: dict[Literal["H", "S", "0", "1"], str] | None = None
  heightm: float | None = None
  weightkg: float | None = None
  color: str | None = None
  secondary_color: str | None = None
  evos: list[str] | None = None
  eggGroups: list[str] | None = None
  tier: str | None = None
  isNonstandard: str | None = None
  otherFormes: list[str] | None = None
  formeOrder: list[str] | None = None
  canGigantamax: str | None = None
  requiredItem: str | None = None
  changesFrom: str | None = None
  thumbnailUrl: str | None = None
  generation: str | None = None
  habitat: str | None = None

  model_config = ConfigDict(extra="ignore")
