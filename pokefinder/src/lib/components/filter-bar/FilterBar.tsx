import { Stack } from "@mui/material";
import { DisabledTypesControl } from "./DisabledTypeControl";
import { useFilters } from "./FilterProvider";
import { TypeSelector } from "./TypeSelector";

export function FilterBar() {
  return <TypesSection />;
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
  )
}