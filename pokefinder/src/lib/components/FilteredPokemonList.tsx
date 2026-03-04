import { useMemo } from 'react';

import { usePokedex } from '@/providers/usePokedex';

import type { Generation } from '../types';

import { useFilters } from './filter-bar/useFilters';
import { PokemonList } from './PokemonList';

export function FilteredPokemonList() {
  const { pokedex } = usePokedex();
  const { type1, type2, excludedTypes, generations } = useFilters();
  const filtered = useMemo(() => {
    const excludedSet = new Set(excludedTypes);
    return pokedex.filter((p) => {
      const pType1 = p.types[0] ?? null;
      const pType2 = p.types[1] ?? null;
      if (type1 !== undefined && pType1 !== type1) return false;
      if (type2 !== undefined && pType2 !== type2) return false;
      if ([pType1, pType2].some((t) => excludedSet.has(t ?? null)))
        return false;
      for (const [key, value] of Object.entries(generations)) {
        const gen = key as Generation;
        if (value === undefined) continue;

        const isInGen = p.generation === gen;
        if (value !== isInGen) return false;
      }
      return true;
    });
  }, [excludedTypes, pokedex, type1, type2, generations]);
  return <PokemonList pokemons={filtered} />;
}
