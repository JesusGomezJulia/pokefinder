import { type LucideIcon } from 'lucide-react';

import MegaIconSVG from '@/icons/mega.svg?react';
import BugIcon from '@/icons/types/bug.svg?react';
import DarkIcon from '@/icons/types/dark.svg?react';
import DragonIcon from '@/icons/types/dragon.svg?react';
import ElectricIcon from '@/icons/types/electric.svg?react';
import FairyIcon from '@/icons/types/fairy.svg?react';
import FightingIcon from '@/icons/types/fighting.svg?react';
import FireIcon from '@/icons/types/fire.svg?react';
import FlyingIcon from '@/icons/types/flying.svg?react';
import GhostIcon from '@/icons/types/ghost.svg?react';
import GrassIcon from '@/icons/types/grass.svg?react';
import GroundIcon from '@/icons/types/ground.svg?react';
import IceIcon from '@/icons/types/ice.svg?react';
import NormalIcon from '@/icons/types/normal.svg?react';
import PoisonIcon from '@/icons/types/poison.svg?react';
import PsychicIcon from '@/icons/types/psychic.svg?react';
import RockIcon from '@/icons/types/rock.svg?react';
import SteelIcon from '@/icons/types/steel.svg?react';
import WaterIcon from '@/icons/types/water.svg?react';

import { Generation, Type } from '../types';
import { svgToLucide } from '../utils/icons';

export type TypeData = {
  colors: {
    main: string;
    contrast: string;
  };
  Icon: LucideIcon;
  name: string;
};
export const TYPE_DATA: Record<Type, TypeData> = {
  [Type.Bug]: {
    colors: { main: '#A8B820', contrast: '#000000' },
    Icon: svgToLucide(BugIcon, 'BugIcon'),
    name: 'Bug',
  },
  [Type.Dark]: {
    colors: { main: '#705848', contrast: '#FFFFFF' },
    Icon: svgToLucide(DarkIcon, 'DarkIcon'),
    name: 'Dark',
  },
  [Type.Dragon]: {
    colors: { main: '#7038F8', contrast: '#FFFFFF' },
    Icon: svgToLucide(DragonIcon, 'DragonIcon'),
    name: 'Dragon',
  },
  [Type.Electric]: {
    colors: { main: '#F8D030', contrast: '#000000' },
    Icon: svgToLucide(ElectricIcon, 'ElectricIcon'),
    name: 'Electric',
  },
  [Type.Fairy]: {
    colors: { main: '#EE99AC', contrast: '#000000' },
    Icon: svgToLucide(FairyIcon, 'FairyIcon'),
    name: 'Fairy',
  },
  [Type.Fighting]: {
    colors: { main: '#C03028', contrast: '#FFFFFF' },
    Icon: svgToLucide(FightingIcon, 'FightingIcon'),
    name: 'Fighting',
  },
  [Type.Fire]: {
    colors: { main: '#F08030', contrast: '#FFFFFF' },
    Icon: svgToLucide(FireIcon, 'FireIcon'),
    name: 'Fire',
  },
  [Type.Flying]: {
    colors: { main: '#A890F0', contrast: '#000000' },
    Icon: svgToLucide(FlyingIcon, 'FlyingIcon'),
    name: 'Flying',
  },
  [Type.Ghost]: {
    colors: { main: '#705898', contrast: '#FFFFFF' },
    Icon: svgToLucide(GhostIcon, 'GhostIcon'),
    name: 'Ghost',
  },
  [Type.Grass]: {
    colors: { main: '#78C850', contrast: '#FFFFFF' },
    Icon: svgToLucide(GrassIcon, 'GrassIcon'),
    name: 'Grass',
  },
  [Type.Ground]: {
    colors: { main: '#E0C068', contrast: '#000000' },
    Icon: svgToLucide(GroundIcon, 'GroundIcon'),
    name: 'Ground',
  },
  [Type.Ice]: {
    colors: { main: '#98D8D8', contrast: '#000000' },
    Icon: svgToLucide(IceIcon, 'IceIcon'),
    name: 'Ice',
  },
  [Type.Normal]: {
    colors: { main: '#A8A878', contrast: '#000000' },
    Icon: svgToLucide(NormalIcon, 'NormalIcon'),
    name: 'Normal',
  },
  [Type.Poison]: {
    colors: { main: '#A040A0', contrast: '#FFFFFF' },
    Icon: svgToLucide(PoisonIcon, 'PoisonIcon'),
    name: 'Poison',
  },
  [Type.Psychic]: {
    colors: { main: '#F85888', contrast: '#FFFFFF' },
    Icon: svgToLucide(PsychicIcon, 'PsychicIcon'),
    name: 'Psychic',
  },
  [Type.Rock]: {
    colors: { main: '#B8A038', contrast: '#FFFFFF' },
    Icon: svgToLucide(RockIcon, 'RockIcon'),
    name: 'Rock',
  },
  [Type.Steel]: {
    colors: { main: '#B8B8D0', contrast: '#000000' },
    Icon: svgToLucide(SteelIcon, 'SteelIcon'),
    name: 'Steel',
  },
  [Type.Water]: {
    colors: { main: '#6890F0', contrast: '#FFFFFF' },
    Icon: svgToLucide(WaterIcon, 'WaterIcon'),
    name: 'Water',
  },
};

export const TYPES: Type[] = Object.keys(TYPE_DATA) as Type[];

export type GenerationData = {
  label: string;
  color: string;
};
export const GENERATION_DATA: Record<Generation, GenerationData> = {
  [Generation.Gen1]: { label: 'I', color: '#0c93c4' },
  [Generation.Gen2]: { label: 'II', color: '#1758c1' },
  [Generation.Gen3]: { label: 'III', color: '#0826bd' },
  [Generation.Gen4]: { label: 'IV', color: '#5105cb' },
  [Generation.Gen5]: { label: 'V', color: '#7309cf' },
  [Generation.Gen6]: { label: 'VI', color: '#9b0ad5' },
  [Generation.Gen7]: { label: 'VII', color: '#bc0fcc' },
  [Generation.Gen8]: { label: 'VIII', color: '#c9116a' },
  [Generation.Gen9]: { label: 'IX', color: '#c71242' },
};
export const GENERATIONS: Generation[] = Object.keys(
  GENERATION_DATA,
) as Generation[];

export const DEFAULT_THUMBNAIL_URL = 'https://placehold.co/256x256/333/DDD.jpg';
export function getDefaultThumbnailUrl(text: string) {
  return `https://placehold.co/256x256/333/DDD.jpg?text=${encodeURIComponent(text)}`;
}

export const MegaIcon = svgToLucide(MegaIconSVG, 'MegaIcon');
