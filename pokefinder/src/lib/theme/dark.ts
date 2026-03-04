import type { ThemeOptions } from '@mui/material';

import { buildThemeComponents } from './components';

export const themeOptions: ThemeOptions = {
  components: buildThemeComponents(),
  palette: {
    mode: 'dark',
    primary: {
      main: '#5eb53f',
    },
    secondary: {
      main: '#00d0f5',
    },
    background: {
      paper: '#2d2d2d',
    },
  },
};
