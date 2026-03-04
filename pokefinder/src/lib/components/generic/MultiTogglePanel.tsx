import { Grid, type GridProps } from '@mui/material';

import type { Setter } from '@/lib/types';

type RenderProps<T> = {
  index: number;
  isSelected: boolean;
  isSolo: boolean;
  selected: T[];
  onClick: (evt: React.MouseEvent) => void;
};
export type MultiPanelToggleProps<T> = GridProps & {
  selected: T[];
  setSelected: Setter<T[]>;
  candidates: T[];
  soloBehavior?: 'include' | 'exclude';
  renderItem: (item: T, data: RenderProps<T>) => React.ReactNode;
};

export function MultiTogglePanel<T>({
  selected,
  setSelected,
  candidates,
  renderItem,
  soloBehavior = 'include',
  ...props
}: MultiPanelToggleProps<T>) {
  const handleToggle = (item: T, mode: 'toggle' | 'solo') => {
    switch (mode) {
      case 'toggle':
        return setSelected((prev) => {
          const isSelected = prev.includes(item);
          if (isSelected) {
            return prev.filter((i) => i !== item);
          } else {
            return [...prev, item];
          }
        });
      case 'solo':
        return setSelected((prev) => {
          const isSelected = prev.includes(item);
          switch (soloBehavior) {
            case 'include':
              if (isSelected && prev.length === 1) {
                return candidates;
              } else {
                return [item];
              }
            case 'exclude':
              if (!isSelected && prev.length === candidates.length - 1) {
                return [];
              }
              return candidates.filter((i) => i !== item);
            default:
              throw new Error(`Invalid soloBehavior ${soloBehavior}`);
          }
        });
      default:
        throw new Error(`Invalid toggleMode ${mode}`);
    }
  };

  const selectedSet = new Set(selected);
  const isSolo =
    selected.length === (soloBehavior === 'include' ? 1 : selected.length - 1);

  return (
    <Grid container {...props}>
      {candidates.map((item, index) => {
        const isSelected = selectedSet.has(item);
        return renderItem(item, {
          index,
          isSelected,
          selected,
          isSolo,
          onClick: (evt) => {
            handleToggle(item, evt.shiftKey ? 'solo' : 'toggle');
          },
        });
      })}
    </Grid>
  );
}
