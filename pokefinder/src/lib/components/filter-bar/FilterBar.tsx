import { Stack } from '@mui/material';

import { DisabledTypesControl } from './DisabledTypeControl';
import { GenFilterControl } from './GenFilterControl';
import { TypeSelector } from './TypeSelector';
import { useFilters } from './useFilters';

export function FilterBar() {
  return (
    <Stack direction="row" gap={4}>
      <TypesSection />
      <GenSection />
    </Stack>
  );
}

function TypesSection() {
  const { type1, type2, setType1, setType2 } = useFilters();
  return (
    <Stack gap={2} width={320}>
      <Stack direction="row" gap={2}>
        <TypeSelector label="Type 1" type={type1} setType={setType1} />
        <TypeSelector label="Type 2" type={type2} setType={setType2} />
      </Stack>
      <DisabledTypesControl />
    </Stack>
  );
}

function GenSection() {
  return <GenFilterControl />;
}
