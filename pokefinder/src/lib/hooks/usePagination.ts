import React from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [page, setPage] = React.useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pagedItems = React.useMemo(
    () => items.slice(page * itemsPerPage, (page + 1) * itemsPerPage),
    [items, page, itemsPerPage],
  );
  return {
    page,
    setPage,
    pagedItems,
    totalPages,
  };
}
