import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokedexProvider } from "./providers/PokedexProvider";
import { createTheme, Stack, ThemeProvider } from "@mui/material";
import { themeOptions } from "./lib/theme/dark";
import { FilterBar } from "./lib/components/filter-bar/FilterBar";
import { FilterProvider } from "./lib/components/filter-bar/FilterProvider";
import { FilteredPokemonList } from "./lib/components/FilteredPokemonList";

const theme = createTheme(themeOptions);
const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <PokedexProvider>
          <FilterProvider>
            <MainPage />
          </FilterProvider>
        </PokedexProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

function MainPage() {
  return (
    <Stack gap={4} bgcolor="background.default" minHeight="100vh" p={4}>
      <FilterBar />
      <FilteredPokemonList />
    </Stack>
  );
}
