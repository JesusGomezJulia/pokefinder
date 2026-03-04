import React, { useContext } from 'react';

import type { Pokemon } from '@/lib/types';

type TPokedexContext = {
  pokedex: Pokemon[];
  pokeData: Map<string, Pokemon>;
};
export const PokedexContext = React.createContext<TPokedexContext>({
  pokedex: [],
  pokeData: new Map(),
});

export function usePokedex() {
  return useContext(PokedexContext);
}
