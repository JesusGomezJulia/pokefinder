import { alpha, Button, darken, Grid } from '@mui/material';

import { XIcon } from 'lucide-react';

import { Type } from '@/lib/types';

import { TYPE_DATA, TYPES } from '../constants';
import { MultiTogglePanel } from '../generic/MultiTogglePanel';
import { TypeIcon } from '../PokeTypes';

import { useFilters } from './useFilters';

const candidates: (Type | null)[] = [...TYPES, null];
export function DisabledTypesControl() {
  const { excludedTypes, setExcludedTypes } = useFilters();
  return (
    <MultiTogglePanel
      candidates={candidates}
      selected={excludedTypes}
      setSelected={setExcludedTypes}
      soloBehavior="exclude"
      container
      spacing={1}
      justifyContent="center"
      columns={9}
      renderItem={(type, { isSelected, isSolo, onClick }) => {
        const { colors } = (type ? TYPE_DATA[type] : null) ?? {
          colors: { main: '#000000', contrast: '#ffffff' },
        };

        return (
          <Grid
            size={1}
            key={type ?? 'null'}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color={isSelected ? 'error' : isSolo ? 'success' : 'info'}
              sx={{
                borderRadius: '50%',
                bgcolor: colors.main,
                color: colors.contrast,
                minWidth: 0,
                p: 0,
                width: 32,
                height: 32,
                opacity: isSelected ? 0.2 : 1,
                boxShadow: `1px 3px 4px ${alpha(colors.main, 0.35)}`,
                '&:hover': {
                  bgcolor: darken(colors.main, 0.2),
                },
              }}
              onClick={onClick}
            >
              {type ? (
                <TypeIcon pokeType={type} size={16} />
              ) : (
                <XIcon size={16} color="white" />
              )}
            </Button>
          </Grid>
        );
      }}
    />
  );
}
