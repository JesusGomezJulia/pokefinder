import type { Components } from '@mui/material';

export function buildThemeComponents(): Components {
  return {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        sx: {
          minWidth: 0,
          p: 1,
        },
      },
    },
  };
}
