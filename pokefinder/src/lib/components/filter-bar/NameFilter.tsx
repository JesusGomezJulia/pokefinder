import { TextField } from '@mui/material';

import { useFilters } from './useFilters';

export function NameFilter() {
  const { name, setName } = useFilters();

  return (
    <TextField
      label="Pokemon Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      fullWidth
    />
  );
}
