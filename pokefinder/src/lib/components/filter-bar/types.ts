import type { Generation, TristateToggle, Type } from '@/lib/types';

export type TypeFilterTarget = Type | null | undefined;
export type GenerationFilters = Partial<Record<Generation, TristateToggle>>;
