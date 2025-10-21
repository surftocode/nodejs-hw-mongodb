export const calculationPages = async (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page > 0);
  const hasPreviousPage = page > 1;
  return {
    totalPages,
    hasNextPage,
    hasPreviousPage,
    page,
    perPage,
    count,
  };
};
