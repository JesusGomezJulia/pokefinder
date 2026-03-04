export type Setter<T> = (updater: Updater<T>) => void;
export type Updater<T> = T | ((oldValue: T) => T);
