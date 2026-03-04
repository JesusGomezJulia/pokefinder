import React from 'react';

import type { Generation, Type } from '@/lib/types';

import type { TypeFilterTarget } from './types';
import { FilterContext } from './useFilters';

export function FilterProvider({ children }: React.PropsWithChildren) {
  const [type1, setType1] = React.useState<TypeFilterTarget>(undefined);
  const [type2, setType2] = React.useState<TypeFilterTarget>(undefined);
  const [excludedTypes, setExcludedTypes] = React.useState<(Type | null)[]>([]);
  const [excludedGens, setExcludedGens] = React.useState<Generation[]>([]);

  return (
    <FilterContext.Provider
      value={{
        type1,
        setType1,
        type2,
        setType2,
        excludedTypes,
        setExcludedTypes,
        excludedGens,
        setExcludedGens,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
