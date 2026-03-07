export enum Type {
  Normal = 'normal',
  Fire = 'fire',
  Water = 'water',
  Electric = 'electric',
  Grass = 'grass',
  Ice = 'ice',
  Fighting = 'fighting',
  Poison = 'poison',
  Ground = 'ground',
  Flying = 'flying',
  Psychic = 'psychic',
  Bug = 'bug',
  Rock = 'rock',
  Ghost = 'ghost',
  Dragon = 'dragon',
  Dark = 'dark',
  Steel = 'steel',
  Fairy = 'fairy',
}
export type GenderRatio = { male: number; female: number; genderless: number };
export enum Gender {
  Male = 'male',
  Female = 'female',
  Genderless = 'genderless',
}
export enum Generation {
  Gen1 = 'generation-i',
  Gen2 = 'generation-ii',
  Gen3 = 'generation-iii',
  Gen4 = 'generation-iv',
  Gen5 = 'generation-v',
  Gen6 = 'generation-vi',
  Gen7 = 'generation-vii',
  Gen8 = 'generation-viii',
  Gen9 = 'generation-ix',
}
export type Stats = {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
};

export type Ability = {
  id: string;
  name: string;
  effect: string;
  description: string;
};

export type AbilityKey = '0' | '1' | 'H';
export type Pokemon = {
  id: string;
  num: number;
  name: string;
  types: Type[];
  generation: Generation;
  genderRatio: GenderRatio;
  colors: string[];
  habitats: string[];
  abilities: Record<AbilityKey, string>;
  shape?: string;
  region?: string;
  form?: string;
  spriteUrl?: string;
  evolvesFrom?: string;
  evolutions: string[];
  baseForm?: string;
  siblingForms: string[];
  isBase: boolean;
  isMega: boolean;
  isGmax: boolean;
  isTera: boolean;
  isTotem: boolean;
  isMythical: boolean;
  isLegendary: boolean;
  isUltrabeast: boolean;
  isParadox: boolean;
  isBaby: boolean;
};
