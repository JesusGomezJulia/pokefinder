export enum Type {Normal = 'Normal', Fire = 'Fire', Water = 'Water', Electric = 'Electric', Grass = 'Grass', Ice = 'Ice', Fighting = 'Fighting', Poison = 'Poison', Ground = 'Ground', Flying = 'Flying', Psychic = 'Psychic', Bug = 'Bug', Rock = 'Rock', Ghost = 'Ghost', Dragon = 'Dragon', Dark = 'Dark', Steel = 'Steel', Fairy = 'Fairy' }
export type GenderRatio = {M: number; F: number; }
export enum Gender {Male = "M", Female = "F", Genderless = "N"}
export type Stats = { hp: number; atk: number; def: number; spa: number; spd: number; spe: number; }
export type Pokemon = {
  id: string;
  num: number;
  name: string;
  types: Type[];
  genderRatio?: GenderRatio;
  gender?: Gender;
  stats: Stats;
  abilities?: Record<"H" | "0" | "1" | "2", string>;
  heightm?: number;
  weightkg?: number;
  color?: string;
  evos?: string[];
  eggGroups?: string[];
  tier?: string;
  isNonstandard?: string;
  otherFormes?: string[];
  formeOrder?: string[];
  canGigantamax?: string;
  requiredItem?: string;
  changesFrom?: string;
}
