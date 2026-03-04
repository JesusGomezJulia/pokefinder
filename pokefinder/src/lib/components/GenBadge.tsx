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
  return (
    <Box
      {...mergeSlotProps(props, {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        px: 0.25,
        boxSizing: 'border-box',
        minWidth: 48,
        minHeight: 48,
        borderRadius: '50%',
      })}
    >
      <Typography alignSelf="center" variant={typographyVariant}>
        {GENERATION_DATA[generation].label}
      </Typography>
    </Box>
  );
}
