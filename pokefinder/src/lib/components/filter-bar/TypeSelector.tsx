import type { Type } from "@/lib/types";
import type { Setter } from "@/lib/types/generics";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { TypeBadge } from "../PokeTypes";
import { TYPES } from "../constants";

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
        <MenuItem value="None">None</MenuItem>
        <MenuItem value="Any">Any</MenuItem>
        {TYPES.map((t) => (
          <MenuItem key={t} value={t}>
            <TypeBadge pokeType={t} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

function typeToString(type: Type | null | undefined) {
  if (type === null) return "None";
  if (type === undefined) return "Any";
  return type;
}

function stringToType(str: string): Type | null | undefined {
  if (str === "None") return null;
  if (str === "Any") return undefined;
  return str as Type;
}
