import { fetchPokedex } from "@/lib/api";
import type { Pokemon } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, type PropsWithChildren } from "react";

type TContext = {
  pokedex: Pokemon[];
  pokeData: Map<string, Pokemon>;
}
const Context = React.createContext<TContext>({
  pokedex: [],
  pokeData: new Map(),
});

export function PokedexProvider({ children }: PropsWithChildren) {
  const { data: pokedex } = useQuery({ queryKey: ['pokedex'], queryFn: fetchPokedex });
  const pokeData = React.useMemo(() => new Map((pokedex ?? []).map((p) => [p.id, p])), [pokedex]);

  return <Context.Provider value={{ pokedex: pokedex ?? [], pokeData }}>{children}</Context.Provider>;
}

export function usePokedex() {
  return useContext(Context);
}