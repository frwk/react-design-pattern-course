import { useMemo, useState } from 'react';

const usePagination = (items: any[], itemsPerPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const slicedItems = useMemo(() =>
    items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [items, currentPage]
  );

  return { slicedItems, currentPage, totalPages, handlePageChange };
}

export default usePagination;
