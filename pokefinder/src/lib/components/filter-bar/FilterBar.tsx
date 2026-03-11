import { Stack } from '@mui/material';

import { FlagFilters } from './FlagFilters';
import { GenFilterControl } from './GenFilterControl';
import { NameFilter } from './NameFilter';
import { TypeFilters } from './TypeFilters';

export function FilterBar() {
  return (
    <Stack gap={1}>
      <NameFilter />
      <Stack direction="row" gap={4}>
        <TypeFilters />
        <GenFilterControl />
        <FlagFilters />
      </Stack>
    </Stack>
  );
}
