import { usePokedex } from "@/providers/PokedexProvider";
import { useFilters } from "./filter-bar/FilterProvider";
import { useMemo } from "react";
import { PokemonList } from "./PokemonList";

export function FilteredPokemonList() {
  const { pokedex } = usePokedex();
  const { type1, type2, excludedTypes } = useFilters();
  const filtered = useMemo(() => {
    const excludedSet = new Set(excludedTypes);
    return pokedex.filter((p) => {
      const pType1 = p.types[0] ?? null;
      const pType2 = p.types[1] ?? null;
      if (type1 !== undefined && pType1 !== type1) return false;
      if (type2 !== undefined && pType2 !== type2) return false;
      if ([pType1, pType2].some((t) => excludedSet.has(t ?? null))) return false;
      return true;
    });
  }, [pokedex, type1, type2, excludedTypes]);
  return <PokemonList pokemons={filtered} />;
}