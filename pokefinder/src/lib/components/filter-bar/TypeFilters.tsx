import { IconButton, Stack, Tooltip } from '@mui/material';

import { ArrowLeftRightIcon, ShuffleIcon } from 'lucide-react';

import { DisabledTypesControl } from './DisabledTypeControl';
import { TypeSelector } from './TypeSelector';
import { useFilters } from './useFilters';

export function TypeFilters() {
  const {
    type1,
    type2,
    setType1,
    setType2,
    ignoreTypeOrder,
    setIgnoreTypeOrder,
  } = useFilters();

  const swap = () => {
    setType1(type2);
    setType2(type1);
  };

  return (
    <Stack gap={2} width={400}>
      <Stack direction="row" gap={0.5}>
        <TypeSelector label="Type 1" type={type1} setType={setType1} />
        <IconButton onClick={swap} sx={{ alignSelf: 'center' }}>
          <ArrowLeftRightIcon size={20} />
        </IconButton>
        <TypeSelector label="Type 2" type={type2} setType={setType2} />
        <Tooltip title="Ignore Type Order">
          <IconButton
            sx={{ alignSelf: 'center' }}
            color={ignoreTypeOrder ? 'success' : 'error'}
            onClick={() => setIgnoreTypeOrder((v) => !v)}
          >
            <ShuffleIcon size={20} />
          </IconButton>
        </Tooltip>
      </Stack>
      <DisabledTypesControl />
    </Stack>
  );
}
