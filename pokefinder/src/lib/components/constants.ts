import { Generation, Type } from '../types';

export type TypeData = {
  colors: {
    main: string;
    contrast: string;
  };
};
export const TYPE_DATA: Record<Type, TypeData> = {
  [Type.Bug]: { colors: { main: '#A8B820', contrast: '#000000' } },
  [Type.Dark]: { colors: { main: '#705848', contrast: '#FFFFFF' } },
  [Type.Dragon]: { colors: { main: '#7038F8', contrast: '#FFFFFF' } },
  [Type.Electric]: { colors: { main: '#F8D030', contrast: '#000000' } },
  [Type.Fairy]: { colors: { main: '#EE99AC', contrast: '#000000' } },
  [Type.Fighting]: { colors: { main: '#C03028', contrast: '#FFFFFF' } },
  [Type.Fire]: { colors: { main: '#F08030', contrast: '#FFFFFF' } },
  [Type.Flying]: { colors: { main: '#A890F0', contrast: '#000000' } },
  [Type.Ghost]: { colors: { main: '#705898', contrast: '#FFFFFF' } },
  [Type.Grass]: { colors: { main: '#78C850', contrast: '#FFFFFF' } },
  [Type.Ground]: { colors: { main: '#E0C068', contrast: '#000000' } },
  [Type.Ice]: { colors: { main: '#98D8D8', contrast: '#000000' } },
  [Type.Normal]: { colors: { main: '#A8A878', contrast: '#000000' } },
  [Type.Poison]: { colors: { main: '#A040A0', contrast: '#FFFFFF' } },
  [Type.Psychic]: { colors: { main: '#F85888', contrast: '#FFFFFF' } },
  [Type.Rock]: { colors: { main: '#B8A038', contrast: '#FFFFFF' } },
  [Type.Steel]: { colors: { main: '#B8B8D0', contrast: '#000000' } },
  [Type.Water]: { colors: { main: '#6890F0', contrast: '#FFFFFF' } },
};

export const TYPES: Type[] = Object.keys(TYPE_DATA) as Type[];

export type GenerationData = {
  label: string;
};
export const GENERATION_DATA: Record<Generation, GenerationData> = {
  [Generation.Gen1]: { label: 'I' },
  [Generation.Gen2]: { label: 'II' },
  [Generation.Gen3]: { label: 'III' },
  [Generation.Gen4]: { label: 'IV' },
  [Generation.Gen5]: { label: 'V' },
  [Generation.Gen6]: { label: 'VI' },
  [Generation.Gen7]: { label: 'VII' },
  [Generation.Gen8]: { label: 'VIII' },
  [Generation.Gen9]: { label: 'IX' },
};
export const GENERATIONS: Generation[] = Object.keys(
  GENERATION_DATA,
) as Generation[];
