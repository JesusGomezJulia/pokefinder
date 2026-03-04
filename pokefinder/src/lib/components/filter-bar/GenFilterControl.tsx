import { Button, Grid, Stack } from '@mui/material';

import { GENERATION_DATA, GENERATIONS } from '../constants';
import { MultiTogglePanel } from '../generic/MultiTogglePanel';

import { useFilters } from './useFilters';

export function GenFilterControl() {
  const { excludedGens, setExcludedGens } = useFilters();

  return (
    <Stack gap={2} width={280}>
      <MultiTogglePanel
        candidates={GENERATIONS}
        selected={excludedGens}
        setSelected={setExcludedGens}
        soloBehavior="exclude"
        columns={5}
        spacing={1}
        renderItem={(gen, { isSelected, isSolo, onClick }) => (
          <Grid size={1} key={gen}>
            <Button
              key={gen}
              color={isSelected ? 'error' : isSolo ? 'success' : 'info'}
              onClick={onClick}
              fullWidth
            >
              {GENERATION_DATA[gen].label}
            </Button>
          </Grid>
        )}
      />
    </Stack>
  );
}
