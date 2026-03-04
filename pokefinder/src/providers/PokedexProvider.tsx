import { useQuery } from '@tanstack/react-query';

import React, { type PropsWithChildren } from 'react';

import { fetchPokedex } from '@/lib/api';
import type { Pokemon } from '@/lib/types';

import { PokedexContext } from './usePokedex';

export function PokedexProvider({ children }: PropsWithChildren) {
  const { data: pokedex } = useQuery({
    queryKey: ['pokedex'],
    queryFn: fetchPokedex,
  });
  const enrichedPokedex = React.useMemo(
    () => pokedex?.map(enrichPokemon) ?? [],
    [pokedex],
  );
  const pokeData = React.useMemo(
    () => new Map((enrichedPokedex ?? []).map((p) => [p.id, p])),
    [enrichedPokedex],
  );

  return (
    <PokedexContext.Provider value={{ pokedex: enrichedPokedex, pokeData }}>
      {children}
    </PokedexContext.Provider>
  );
}

function enrichPokemon(p: Pokemon): Pokemon {
  return {
    thumbnailUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.num}.png`,
    ...p,
  };
}
