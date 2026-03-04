import { Button, Grid, Stack } from '@mui/material';

import { RotateCcwIcon, XIcon } from 'lucide-react';

import type { Generation, TristateToggle } from '@/lib/types';

import { GENERATION_DATA, GENERATIONS } from '../constants';

import type { GenerationFilters } from './types';
import { useFilters } from './useFilters';

export function GenFilterControl() {
  const { generations, setGenerations } = useFilters();

  const toggleState = (gen: Generation, behavior: 'reset' | 'cycle') => {
    setGenerations((prev) => ({
      ...prev,
      [gen]: behavior === 'cycle' ? cycle(prev[gen]) : undefined,
    }));
  };
  const setNone = () => {
    setGenerations(
      Object.fromEntries(
        GENERATIONS.map((g) => [g, false]),
      ) as GenerationFilters,
    );
  };
  const reset = () => {
    setGenerations({});
  };

  return (
    <Stack gap={2} width={280}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Button
            color="error"
            startIcon={<XIcon />}
            onClick={setNone}
            fullWidth
          >
            Set None
          </Button>
        </Grid>
        <Grid size={6}>
          <Button
            color="warning"
            startIcon={<RotateCcwIcon />}
            onClick={reset}
            fullWidth
          >
            Reset
          </Button>
        </Grid>
      </Grid>
      <Grid container columns={5} spacing={1}>
        {GENERATIONS.map((gen) => {
          const genState = generations[gen];

          return (
            <Grid size={1}>
              <Button
                key={gen}
                color={
                  genState === undefined
                    ? 'info'
                    : genState
                      ? 'success'
                      : 'error'
                }
                onClick={(e) =>
                  toggleState(gen, e.shiftKey ? 'reset' : 'cycle')
                }
                fullWidth
              >
                {GENERATION_DATA[gen].label}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

function cycle(prev: TristateToggle) {
  switch (prev) {
    case undefined:
      return true;
    case true:
      return false;
    case false:
      return undefined;
  }
}
