import { Button, Grid } from '@mui/material';

import { XIcon } from 'lucide-react';

import { Type } from '@/lib/types';

import { TYPES } from '../constants';
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
      renderItem={(type, { isSelected, isSolo, onClick }) => (
        <Grid size={2} key={type ?? 'null'}>
          <Button
            variant="contained"
            color={isSelected ? 'error' : isSolo ? 'success' : 'info'}
            fullWidth
            onClick={onClick}
          >
            {type ? (
              <TypeIcon pokeType={type} size={16} color="white" />
            ) : (
              <XIcon size={16} color="white" />
            )}
          </Button>
        </Grid>
      )}
    />
  );
}
