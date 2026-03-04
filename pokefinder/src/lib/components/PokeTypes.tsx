import { Box, Stack, Typography } from '@mui/material';

import { getBrightness } from '@/lib/theme/color';
import type { Type } from '@/lib/types';

import { TYPE_COLORS, TYPE_CONTRAST } from './constants';

type PokeTypesProps = {
  types: Type[];
  iconOnly?: boolean;
};
export function PokeTypes({ types, iconOnly }: PokeTypesProps) {
  return (
    <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
      {types.map((t) => (
        <TypeBadge key={t} pokeType={t} iconOnly={iconOnly} />
      ))}
    </Stack>
  );
}

type TypeBadgeProps = {
  pokeType: Type; // 'type' is reserved
  iconOnly?: boolean;
};
export function TypeBadge({ pokeType, iconOnly }: TypeBadgeProps) {
  const typeColor = TYPE_COLORS[pokeType]; // define this object somewhere in your library
  const contrastColor = TYPE_CONTRAST[pokeType];

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      p={1}
      bgcolor={typeColor}
      color={contrastColor}
      borderRadius={3}
    >
      <TypeIcon pokeType={pokeType} />{' '}
      {/* Also define this somewhere, maybe pull from that same github's sprites? */}
      {!iconOnly && ( // yay conditional rendering!
        <Typography variant="body1">{pokeType}</Typography>
      )}
    </Stack>
  );
}

type TypeIconProps = {
  pokeType: Type;
  iconSize?: number;
  invert?: boolean;
};
export function TypeIcon({ pokeType, iconSize = 18, invert }: TypeIconProps) {
  const iconUrl = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${pokeType.toLowerCase()}.svg`;
  const contrastColor = TYPE_CONTRAST[pokeType];
  const contrastBrightness = getBrightness(contrastColor);
  const shouldInvert = invert !== undefined ? invert : contrastBrightness < 0.5;
  return (
    <Box
      component="object"
      data={iconUrl}
      type="image/svg+xml"
      aria-label={`${pokeType} type icon`}
      sx={{
        width: iconSize,
        height: iconSize,
        filter: shouldInvert ? 'invert(1)' : 'none',
      }}
    >
      <Box
        component="img"
        src={iconUrl}
        alt={`${pokeType} type icon`}
        width={iconSize}
        height={iconSize}
      />
    </Box>
  );
}
