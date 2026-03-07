import { Button, darken, Grid, Stack } from '@mui/material';

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
        renderItem={(gen, { isSelected, onClick }) => {
          const { label, color } = GENERATION_DATA[gen];

          return (
            <Grid size={1} key={gen}>
              <Button
                key={gen}
                sx={{
                  color: 'text.primary',
                  bgcolor: color,
                  opacity: isSelected ? 0.25 : 1,
                  minWidth: 0,
                  '&:hover': {
                    bgcolor: darken(color, 0.3),
                  },
                }}
                onClick={onClick}
                fullWidth
              >
                {label}
              </Button>
            </Grid>
          );
        }}
      />
    </Stack>
  );
}
