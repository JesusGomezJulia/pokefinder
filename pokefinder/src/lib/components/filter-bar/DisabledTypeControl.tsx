import { Button, Grid } from "@mui/material";
import { useFilters } from "./FilterProvider";
import { Type } from "@/lib/types";
import { TypeIcon } from "../PokeTypes";
import { XIcon } from "lucide-react";
import { TYPES } from "../constants";

const candidates: (Type | null)[] = [...TYPES, null];
export function DisabledTypesControl() {
  const { excludedTypes, setExcludedTypes } = useFilters();
  return (
    <Grid container spacing={1} alignSelf="flex-start">
      {candidates.map((type) => (
        <Grid size={2} key={type?.toString() ?? "null"}>
          <Button
            variant="contained"
            color={excludedTypes.includes(type) ? "error" : "info"}
            sx={{ p: 0.5, minWidth: 0, width: "100%" }}
            onClick={() => {
              setExcludedTypes((excludedTypes) => {
                if (excludedTypes.includes(type)) {
                  return excludedTypes.filter((t) => t !== type);
                } else {
                  return [...excludedTypes, type];
                }
              });
            }}
          >
            {type ? (
              <TypeIcon iconSize={16} pokeType={type} invert={false} />
            ) : (
              <XIcon size={16} color="white" />
            )}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
