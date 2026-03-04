import { fetchPokedex } from "@/lib/api";
import type { Pokemon } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, type PropsWithChildren } from "react";

type TContext = {
  pokedex: Pokemon[];
  pokeData: Map<string, Pokemon>;
};
const Context = React.createContext<TContext>({
  pokedex: [],
  pokeData: new Map(),
});

export function PokedexProvider({ children }: PropsWithChildren) {
  const { data: pokedex } = useQuery({
    queryKey: ["pokedex"],
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
    <Context.Provider value={{ pokedex: enrichedPokedex, pokeData }}>
      {children}
    </Context.Provider>
  );
}

export function usePokedex() {
  return useContext(Context);
}

function enrichPokemon(p: Pokemon): Pokemon {
  return {
    thumbnailUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.num}.png`,
    ...p,
  };
}
