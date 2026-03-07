import { Box, Stack, Typography } from '@mui/material';

import React from 'react';

import type { Pokemon } from '@/lib/types';

import { getDefaultThumbnailUrl } from './constants';
import { GenBadge } from './GenBadge';
import { PokeTypes } from './PokeTypes';

const POKEMON_IMG_SIZE = 288; // define this somewhere in your library, maybe even make it a prop for the card?

type PokemonCardProps = {
  pokemon: Pokemon;
};
function PokemonCardInternal({ pokemon }: PokemonCardProps) {
  return (
    <Stack
      flexGrow={1}
      p={1} // padding
      borderRadius={2}
      bgcolor="background.paper"
      color="text.primary"
      position="relative"
    >
      <Box
        component="object"
        data={pokemon.spriteUrl}
        type="image/jpeg"
        aria-label={pokemon.name}
        height={POKEMON_IMG_SIZE}
        sx={{ objectFit: 'contain', imageRendering: 'pixelated' }}
      >
        <Box
          component="img"
          src={getDefaultThumbnailUrl(pokemon.name)}
          alt={pokemon.name}
          height={POKEMON_IMG_SIZE}
          sx={{ objectFit: 'contain' }}
        />
      </Box>
      <Typography variant="h4" textAlign="center">
        {pokemon.name}
      </Typography>
      <Box flexGrow={1} />
      <PokeTypes types={pokemon.types} />
      <Stack
        direction="row"
        position="absolute"
        top={0}
        left={0}
        right={0}
        p={2}
      >
        <Typography variant="h6"># {pokemon.num}</Typography>
        <Box flexGrow={1} />
        {pokemon.generation && <GenBadge generation={pokemon.generation} />}
      </Stack>
    </Stack>
  );
}

export const PokemonCard = React.memo(PokemonCardInternal);
