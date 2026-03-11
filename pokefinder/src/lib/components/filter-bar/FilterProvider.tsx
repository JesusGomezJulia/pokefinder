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
  const [isMega, setIsMega] = React.useState<boolean | null>(null);
  const [isGmax, setIsGmax] = React.useState<boolean | null>(null);
  const [isTera, setIsTera] = React.useState<boolean | null>(null);
  const [isTotem, setIsTotem] = React.useState<boolean | null>(false);
  const [isMythical, setIsMythical] = React.useState<boolean | null>(null);
  const [isLegendary, setIsLegendary] = React.useState<boolean | null>(null);
  const [isUltrabeast, setIsUltrabeast] = React.useState<boolean | null>(null);
  const [isParadox, setIsParadox] = React.useState<boolean | null>(null);
  const [isBaby, setIsBaby] = React.useState<boolean | null>(null);

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
        isMega,
        setIsMega,
        isGmax,
        setIsGmax,
        isTera,
        setIsTera,
        isTotem,
        setIsTotem,
        isMythical,
        setIsMythical,
        isLegendary,
        setIsLegendary,
        isUltrabeast,
        setIsUltrabeast,
        isParadox,
        setIsParadox,
        isBaby,
        setIsBaby,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
