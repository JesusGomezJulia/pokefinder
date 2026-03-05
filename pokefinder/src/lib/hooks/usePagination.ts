import React, { useEffect } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = React.useState(0);
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const pagedItems = React.useMemo(
    () => items.slice(page * itemsPerPage, (page + 1) * itemsPerPage),
    [items, page, itemsPerPage],
  );

  useEffect(() => {
    if (page >= totalPages) {
      setPage(totalPages - 1);
    } else if (page < 0) {
      setPage(0);
    }
  }, [page, totalPages]);
  
  return {
    page,
    setPage,
    pagedItems,
    totalPages,
  };
}
