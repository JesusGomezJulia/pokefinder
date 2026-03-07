import React from 'react';

import type { Generation, Setter, Type } from '@/lib/types';

import type { TypeFilterTarget } from './types';

type TFilterContext = {
  type1: TypeFilterTarget;
  setType1: Setter<TypeFilterTarget>;
  type2: TypeFilterTarget;
  setType2: Setter<TypeFilterTarget>;
  ignoreTypeOrder: boolean;
  setIgnoreTypeOrder: Setter<boolean>;
  excludedTypes: (Type | null)[];
  setExcludedTypes: Setter<(Type | null)[]>;
  excludedGens: Generation[];
  setExcludedGens: Setter<Generation[]>;
  name: string;
  setName: Setter<string>;
};
export const FilterContext = React.createContext<TFilterContext | null>(null);

export function useFilters() {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
