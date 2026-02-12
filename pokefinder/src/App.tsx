import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PokedexProvider, usePokedex } from "./providers/PokedexProvider"

const queryClient = new QueryClient()

export default function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <PokedexProvider>
        <MainPage />
      </PokedexProvider>
    </QueryClientProvider>
  )
}

function MainPage() {
  const { pokedex } = usePokedex();
  return <div className="p-4">Hello, Pokefinder!</div>
}