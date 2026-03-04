import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import type { Type } from '@/lib/types';
import type { Setter } from '@/lib/types/generics';

import { TYPES } from '../constants';
import { TypeBadge } from '../PokeTypes';

type TypeSelectorProps = {
  type: Type | null | undefined;
  setType: Setter<Type | null | undefined>;
  label: string;
};
export function TypeSelector({ type, setType, label }: TypeSelectorProps) {
  return (
    <FormControl size="small" variant="filled" fullWidth>
      <InputLabel id="type-label">{label}</InputLabel>
      <Select
        labelId="type-label"
        id="type-select"
        value={typeToString(type)}
        label={label}
        onChange={(e) => setType(stringToType(e.target.value as string))}
      >
        <MenuItem value="None">
          <Typography sx={{ py: 0.25 }}>None</Typography>
        </MenuItem>
        <MenuItem value="Any">
          <Typography sx={{ py: 0.25 }}>Any</Typography>
        </MenuItem>
        {TYPES.map((t) => (
          <MenuItem key={t} value={t}>
            <TypeBadge pokeType={t} py={0.25} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function typeToString(type: Type | null | undefined) {
  if (type === null) return 'None';
  if (type === undefined) return 'Any';
  return type;
}

function stringToType(str: string): Type | null | undefined {
  if (str === 'None') return null;
  if (str === 'Any') return undefined;
  return str as Type;
}
