import {
  Button,
  type ButtonProps,
  darken,
  mergeSlotProps,
  type SxProps,
  type Theme,
} from '@mui/material';

import type { LucideIcon } from 'lucide-react';

export type TriStateButtonProps = Omit<ButtonProps, 'color'> & {
  state: boolean | null;
  onClick: () => void;
  label?: string;
  Icon?: LucideIcon;
  iconSize?: number;
  color?: string;
  contrastColor?: string;
};

export function TriStateButton({
  state,
  onClick,
  label,
  Icon,
  iconSize,
  color,
  contrastColor,
  ...props
}: TriStateButtonProps) {
  const activeStyle: SxProps<Theme> = (theme) => ({
    color: contrastColor || theme.palette.primary.contrastText,
    bgcolor: color || theme.palette.primary.main,
    '&:hover': {
      bgcolor: darken(color || theme.palette.primary.main, 0.2),
    },
  });
  const inactiveStyle: SxProps<Theme> = (theme) => ({
    color: color || theme.palette.primary.main,
    bgcolor: theme.palette.background.paper,
    '&:hover': {
      bgcolor: darken(theme.palette.background.paper, 0.2),
    },
    opacity: 0.2,
  });
  const nullStyle: SxProps<Theme> = (theme) => ({
    color: color || theme.palette.primary.main,
    bgcolor: theme.palette.background.paper,
    '&:hover': {
      bgcolor: darken(theme.palette.background.paper, 0.2),
    },
  });
  const style =
    state === null ? nullStyle : state ? activeStyle : inactiveStyle;

  return (
    <Button
      {...mergeSlotProps(props, {
        sx: [style, { minWidth: 0 }],
        startIcon: Icon && <Icon size={iconSize} />,
      })}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
