import React from 'react';

import type { Generation, Type } from '@/lib/types';

import type { TypeFilterTarget } from './types';
import { FilterContext } from './useFilters';

export function FilterProvider({ children }: React.PropsWithChildren) {
  const [type1, setType1] = React.useState<TypeFilterTarget>(undefined);
  const [type2, setType2] = React.useState<TypeFilterTarget>(undefined);
  const [ignoreTypeOrder, setIgnoreTypeOrder] = React.useState<boolean>(false);
  const [excludedTypes, setExcludedTypes] = React.useState<(Type | null)[]>([]);
  const [excludedGens, setExcludedGens] = React.useState<Generation[]>([]);
  const [name, setName] = React.useState<string>('');

  return (
    <FilterContext.Provider
      value={{
        type1,
        setType1,
        type2,
        setType2,
        ignoreTypeOrder,
        setIgnoreTypeOrder,
        excludedTypes,
        setExcludedTypes,
        excludedGens,
        setExcludedGens,
        name,
        setName,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
