import { useMemo, useState } from 'react';

const usePagination = (items: unknown[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => items.length ? Math.ceil(items.length / itemsPerPage) : 0, [items, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const slicedItems = useMemo(() =>
    items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [items, itemsPerPage, currentPage]
  );

  return { slicedItems, currentPage, totalPages, handlePageChange };
}

export default usePagination;
