import React from "react";
import type { Type } from "../../types";
import type { Setter } from "../../types/generics";

type TypeFilterTarget = Type | null | undefined;

type TContext = {
  type1: TypeFilterTarget;
  setType1: Setter<TypeFilterTarget>;
  type2: TypeFilterTarget;
  setType2: Setter<TypeFilterTarget>;
  excludedTypes: (Type | null)[];
  setExcludedTypes: Setter<(Type | null)[]>;
};
export const Context = React.createContext<TContext | null>(null);

export function FilterProvider({ children }: React.PropsWithChildren) {
  const [type1, setType1] = React.useState<TypeFilterTarget>(null);
  const [type2, setType2] = React.useState<TypeFilterTarget>(null);
  const [excludedTypes, setExcludedTypes] = React.useState<(Type | null)[]>([]);

  return (
    <Context.Provider
      value={{
        type1,
        setType1,
        type2,
        setType2,
        excludedTypes,
        setExcludedTypes,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useFilters() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}
