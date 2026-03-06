import { Stack, type StackProps, Typography } from '@mui/material';

import { CircleQuestionMarkIcon, type LucideProps } from 'lucide-react';

import type { Type } from '@/lib/types';

import { TYPE_DATA } from './constants';

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

type TypeBadgeProps = StackProps & {
  pokeType: Type;
  iconOnly?: boolean;
};
export function TypeBadge({ pokeType, iconOnly, ...props }: TypeBadgeProps) {
  const { colors } = TYPE_DATA[pokeType] ?? { colors: { main: '#777', contrast: '#fff' } };

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      p={1}
      bgcolor={colors.main}
      color={colors.contrast}
      borderRadius={3}
      {...props}
    >
      <TypeIcon pokeType={pokeType} />{' '}
      {!iconOnly && <Typography variant="body1">{pokeType}</Typography>}
    </Stack>
  );
}

type TypeIconProps = LucideProps & {
  pokeType: Type;
};
export function TypeIcon({ pokeType, size = 20, ...props }: TypeIconProps) {
  const typeData = TYPE_DATA[pokeType] ?? {Icon: CircleQuestionMarkIcon};

  if (!typeData) return <CircleQuestionMarkIcon size={size} {...props} />;
  const { Icon } = typeData;

  return <Icon size={size} {...props} />;
}
