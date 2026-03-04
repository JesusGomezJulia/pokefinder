import { type LucideIcon } from 'lucide-react';

import BugIcon from '@/icons/bug.svg?react';
import DarkIcon from '@/icons/dark.svg?react';
import DragonIcon from '@/icons/dragon.svg?react';
import ElectricIcon from '@/icons/electric.svg?react';
import FairyIcon from '@/icons/fairy.svg?react';
import FightingIcon from '@/icons/fighting.svg?react';
import FireIcon from '@/icons/fire.svg?react';
import FlyingIcon from '@/icons/flying.svg?react';
import GhostIcon from '@/icons/ghost.svg?react';
import GrassIcon from '@/icons/grass.svg?react';
import GroundIcon from '@/icons/ground.svg?react';
import IceIcon from '@/icons/ice.svg?react';
import NormalIcon from '@/icons/normal.svg?react';
import PoisonIcon from '@/icons/poison.svg?react';
import PsychicIcon from '@/icons/psychic.svg?react';
import RockIcon from '@/icons/rock.svg?react';
import SteelIcon from '@/icons/steel.svg?react';
import WaterIcon from '@/icons/water.svg?react';

import { Generation, Type } from '../types';
import { svgToLucide } from '../utils/icons';

export type TypeData = {
  colors: {
    main: string;
    contrast: string;
  };
  Icon: LucideIcon;
};
export const TYPE_DATA: Record<Type, TypeData> = {
  [Type.Bug]: {
    colors: { main: '#A8B820', contrast: '#000000' },
    Icon: svgToLucide(BugIcon, 'BugIcon'),
  },
  [Type.Dark]: {
    colors: { main: '#705848', contrast: '#FFFFFF' },
    Icon: svgToLucide(DarkIcon, 'DarkIcon'),
  },
  [Type.Dragon]: {
    colors: { main: '#7038F8', contrast: '#FFFFFF' },
    Icon: svgToLucide(DragonIcon, 'DragonIcon'),
  },
  [Type.Electric]: {
    colors: { main: '#F8D030', contrast: '#000000' },
    Icon: svgToLucide(ElectricIcon, 'ElectricIcon'),
  },
  [Type.Fairy]: {
    colors: { main: '#EE99AC', contrast: '#000000' },
    Icon: svgToLucide(FairyIcon, 'FairyIcon'),
  },
  [Type.Fighting]: {
    colors: { main: '#C03028', contrast: '#FFFFFF' },
    Icon: svgToLucide(FightingIcon, 'FightingIcon'),
  },
  [Type.Fire]: {
    colors: { main: '#F08030', contrast: '#FFFFFF' },
    Icon: svgToLucide(FireIcon, 'FireIcon'),
  },
  [Type.Flying]: {
    colors: { main: '#A890F0', contrast: '#000000' },
    Icon: svgToLucide(FlyingIcon, 'FlyingIcon'),
  },
  [Type.Ghost]: {
    colors: { main: '#705898', contrast: '#FFFFFF' },
    Icon: svgToLucide(GhostIcon, 'GhostIcon'),
  },
  [Type.Grass]: {
    colors: { main: '#78C850', contrast: '#FFFFFF' },
    Icon: svgToLucide(GrassIcon, 'GrassIcon'),
  },
  [Type.Ground]: {
    colors: { main: '#E0C068', contrast: '#000000' },
    Icon: svgToLucide(GroundIcon, 'GroundIcon'),
  },
  [Type.Ice]: {
    colors: { main: '#98D8D8', contrast: '#000000' },
    Icon: svgToLucide(IceIcon, 'IceIcon'),
  },
  [Type.Normal]: {
    colors: { main: '#A8A878', contrast: '#000000' },
    Icon: svgToLucide(NormalIcon, 'NormalIcon'),
  },
  [Type.Poison]: {
    colors: { main: '#A040A0', contrast: '#FFFFFF' },
    Icon: svgToLucide(PoisonIcon, 'PoisonIcon'),
  },
  [Type.Psychic]: {
    colors: { main: '#F85888', contrast: '#FFFFFF' },
    Icon: svgToLucide(PsychicIcon, 'PsychicIcon'),
  },
  [Type.Rock]: {
    colors: { main: '#B8A038', contrast: '#FFFFFF' },
    Icon: svgToLucide(RockIcon, 'RockIcon'),
  },
  [Type.Steel]: {
    colors: { main: '#B8B8D0', contrast: '#000000' },
    Icon: svgToLucide(SteelIcon, 'SteelIcon'),
  },
  [Type.Water]: {
    colors: { main: '#6890F0', contrast: '#FFFFFF' },
    Icon: svgToLucide(WaterIcon, 'WaterIcon'),
  },
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
