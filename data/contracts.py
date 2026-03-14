from dataclasses import field
from typing import Literal

from pydantic import BaseModel

class GenderRatioContract(BaseModel):
  male: float
  female: float
  genderless: float

class AbilityContract(BaseModel):
  id: str
  name: str
  effect: str
  description: str

AbilityKey = Literal["H", "0", "1"]
class PokemonContract(BaseModel):
  id: str
  num: int
  name: str
  types: list[str]
  generation: str
  genderRatio: GenderRatioContract
  colors: list[str]
  habitats: list[str]
  abilities: dict[AbilityKey, str]
  shape: str | None
  region: str | None
  form: str | None
  spriteUrl: str | None
  evolvesFrom: str | None
  evolutions: list[str] = []
  stage: int
  baseForm: str | None
  siblingForms: list[str] = []
  isBase: bool
  isMega: bool
  isGmax: bool
  isTera: bool
  isTotem: bool
  isMythical: bool
  isLegendary: bool
  isUltrabeast: bool
  isParadox: bool
  isBaby: bool

