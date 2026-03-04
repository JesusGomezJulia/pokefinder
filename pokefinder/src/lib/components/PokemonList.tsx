import type { Pokemon } from "../types";
import { Grid, Stack, useTheme } from "@mui/material";
import { PokemonCard } from "./PokemonCard";
import { usePagination } from "../hooks/usePagination";
import { PaginationControls } from "./PaginationControls";

type PokemonListProps = {
  pokemons: Pokemon[];
  pageSize?: number;
};
export function PokemonList({ pokemons, pageSize = 24 }: PokemonListProps) {
  const theme = useTheme();
  console.log(theme);
  const {
    page,
    setPage,
    pagedItems: pagedPokemons,
    totalPages,
  } = usePagination(pokemons, pageSize);
  return (
    <Stack gap={2}>
      <Grid container spacing={2}>
        {pagedPokemons.map((p) => (
          <Grid
            key={p.id}
            display="flex"
            flexDirection="column"
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          >
            <PokemonCard pokemon={p} />
          </Grid>
        ))}
      </Grid>
      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Stack>
  );
}
