import {
  Box,
  type BoxProps,
  mergeSlotProps,
  Typography,
  type TypographyProps,
} from '@mui/material';

import type { Generation } from '../types';

import { GENERATION_DATA } from './constants';

type GenBadgeProps = BoxProps & {
  generation: Generation;
  typographyVariant?: TypographyProps['variant'];
};
export function GenBadge({
  generation,
  typographyVariant = 'h5',
  ...props
}: GenBadgeProps) {
  const { label, color } = GENERATION_DATA[generation];

  return (
    <Box
      {...mergeSlotProps(props, {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: color,
        px: 0.25,
        boxSizing: 'border-box',
        minWidth: 48,
        minHeight: 48,
        borderRadius: '50%',
      })}
    >
      <Typography alignSelf="center" variant={typographyVariant}>
        {label}
      </Typography>
    </Box>
  );
}
