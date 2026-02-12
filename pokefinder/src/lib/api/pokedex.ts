import type { Pokemon } from "../types";

export async function fetchPokedex() {
  const res = await fetch("data/pokedex.json");
  const data = await res.json();
  return preprocessPokedex(data);
}

function preprocessPokedex(pokedex: Record<string, Omit<Pokemon, 'id'>>): Pokemon[] {
  const result: Pokemon[] = [];
  for (const id in pokedex) {
    const pokemon = { id, ...pokedex[id] };
    result.push(pokemon);  
  }
  return result;
}