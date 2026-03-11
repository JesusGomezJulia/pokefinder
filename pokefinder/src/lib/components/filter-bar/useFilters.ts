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
  isMega: boolean | null;
  setIsMega: Setter<boolean | null>;
  isGmax: boolean | null;
  setIsGmax: Setter<boolean | null>;
  isTera: boolean | null;
  setIsTera: Setter<boolean | null>;
  isTotem: boolean | null;
  setIsTotem: Setter<boolean | null>;
  isMythical: boolean | null;
  setIsMythical: Setter<boolean | null>;
  isLegendary: boolean | null;
  setIsLegendary: Setter<boolean | null>;
  isUltrabeast: boolean | null;
  setIsUltrabeast: Setter<boolean | null>;
  isParadox: boolean | null;
  setIsParadox: Setter<boolean | null>;
  isBaby: boolean | null;
  setIsBaby: Setter<boolean | null>;
};
export const FilterContext = React.createContext<TFilterContext | null>(null);

export function useFilters() {
  const context = React.useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
