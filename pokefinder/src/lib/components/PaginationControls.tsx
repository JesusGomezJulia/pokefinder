import { Button, Stack, Typography } from '@mui/material';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
      <Button onClick={() => onPageChange(0)} disabled={currentPage === 0}>
        <ChevronsLeftIcon size={16} />
      </Button>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <ChevronLeftIcon size={16} />
      </Button>
      <Typography variant="body1" color="text.primary">
        Page {currentPage + 1} of {totalPages}
      </Typography>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronRightIcon size={16} />
      </Button>
      <Button
        onClick={() => onPageChange(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
      >
        <ChevronsRightIcon size={16} />
      </Button>
    </Stack>
  );
}
