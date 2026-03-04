import type { Type } from '@lib/types';

import React from 'react';

import { GENERATIONS } from '../constants';

import type { GenerationFilters, TypeFilterTarget } from './types';
import { FilterContext } from './useFilters';

const defaultGenFilters = Object.fromEntries(
  GENERATIONS.map((g) => [g, undefined]),
) as GenerationFilters;

export function FilterProvider({ children }: React.PropsWithChildren) {
  const [type1, setType1] = React.useState<TypeFilterTarget>(undefined);
  const [type2, setType2] = React.useState<TypeFilterTarget>(undefined);
  const [excludedTypes, setExcludedTypes] = React.useState<(Type | null)[]>([]);
  const [generations, setGenerations] =
    React.useState<GenerationFilters>(defaultGenFilters);

  return (
    <FilterContext.Provider
      value={{
        type1,
        setType1,
        type2,
        setType2,
        excludedTypes,
        setExcludedTypes,
        generations,
        setGenerations,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
