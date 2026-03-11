import { useMemo } from 'react';

import { usePokedex } from '@/providers/usePokedex';

import type { Type } from '../types';

import { useFilters } from './filter-bar/useFilters';
import { TYPES } from './constants';
import { PokemonList } from './PokemonList';

const TYPES_AND_NULL = [...TYPES, null];

export function FilteredPokemonList() {
  const { pokedex } = usePokedex();
  const {
    type1,
    type2,
    excludedTypes,
    excludedGens,
    ignoreTypeOrder,
    name,
    isMega,
    isGmax,
    isTera,
    isTotem,
    isMythical,
    isLegendary,
    isUltrabeast,
    isParadox,
    isBaby,
  } = useFilters();
  const filtered = useMemo(() => {
    const excludedGensSet = new Set(excludedGens);

    const allowedFirstType: Set<Type | null> =
      type1 === undefined ? new Set(TYPES_AND_NULL) : new Set([type1]);
    const allowedSecondType: Set<Type | null> =
      type2 === undefined ? new Set(TYPES_AND_NULL) : new Set([type2]);

    excludedTypes.forEach((t) => {
      allowedFirstType.delete(t);
      allowedSecondType.delete(t);
    });

    const normalizedName = normalizeString(name);

    return pokedex.filter((p) => {
      /* eslint-disable prettier/prettier */
      if (isMega !== null && p.isMega !== isMega) return false;
      if (isGmax !== null && p.isGmax !== isGmax) return false;
      if (isTera !== null && p.isTera !== isTera) return false;
      if (isTotem !== null && p.isTotem !== isTotem) return false;
      if (isMythical !== null && p.isMythical !== isMythical) return false;
      if (isLegendary !== null && p.isLegendary !== isLegendary) return false;
      if (isUltrabeast !== null && p.isUltrabeast !== isUltrabeast) return false;
      if (isParadox !== null && p.isParadox !== isParadox) return false;
      if (isBaby !== null && p.isBaby !== isBaby) return false;
      /* eslint-enable prettier/prettier */

      const firstType = p.types[0] ?? null;
      const secondType = p.types[1] ?? null;

      const typeOptions = [[firstType, secondType]];
      if (ignoreTypeOrder) {
        typeOptions.push([secondType, firstType]);
      }

      if (
        !typeOptions.some(
          ([t1, t2]) => allowedFirstType.has(t1) && allowedSecondType.has(t2),
        )
      )
        return false;

      if (p.generation && excludedGensSet.has(p.generation)) return false;
      if (name) {
        const normalizedPokemonName = normalizeString(p.name);
        if (!normalizedPokemonName.includes(normalizedName)) return false;
      }
      return true;
    });
  }, [
    excludedGens,
    type1,
    type2,
    excludedTypes,
    name,
    pokedex,
    isMega,
    isGmax,
    isTera,
    isTotem,
    isMythical,
    isLegendary,
    isUltrabeast,
    isParadox,
    isBaby,
    ignoreTypeOrder,
  ]);
  return <PokemonList pokemons={filtered} />;
}

function normalizeString(text: string) {
  return text.toLowerCase().replace(/\s|[-.,']/, '');
}
