from typing import Literal
from pydantic import BaseModel, ConfigDict

class Pokemon(BaseModel):
  num: int
  name: str
  types: list[str]
  genderRatio: dict | None = None
  gender: str | None = None
  baseStats: dict | None = None
  abilities: dict[Literal["H", "S", "0", "1", "2"], str] | None = None
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


class Generation(BaseModel):
  id: int
  name: str

  model_config = ConfigDict(extra="ignore")


class Sprites(BaseModel):
  front_default: str | None = None
  other: dict | None = None

  model_config = ConfigDict(extra="ignore")


class PokemonSprites(BaseModel):
  sprites: Sprites

  model_config = ConfigDict(extra="ignore")


class ExtraPokemon(BaseModel):
  id: int
  name: str
  pokemonsprites: list[PokemonSprites]

  model_config = ConfigDict(extra="ignore")

class Species(BaseModel):
  id: int
  name: str
  pokemons: list[ExtraPokemon]
  generation: Generation
  pokemon_color_id: int | None = None
  pokemon_habitat_id: int | None = None

  model_config = ConfigDict(extra="ignore")
