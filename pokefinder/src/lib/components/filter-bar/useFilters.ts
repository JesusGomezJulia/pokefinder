import React from 'react';

import type { Generation, Setter, TristateToggle, Type } from '@/lib/types';

import type { TypeFilterTarget } from './types';

type TFilterContext = {
  type1: TypeFilterTarget;
  setType1: Setter<TypeFilterTarget>;
  type2: TypeFilterTarget;
  setType2: Setter<TypeFilterTarget>;
  excludedTypes: (Type | null)[];
  setExcludedTypes: Setter<(Type | null)[]>;
  generations: Record<Generation, TristateToggle>;
  setGenerations: Setter<Record<Generation, TristateToggle>>;
};
export const FilterContext = React.createContext<TFilterContext | null>(null);

export function useFilters() {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
