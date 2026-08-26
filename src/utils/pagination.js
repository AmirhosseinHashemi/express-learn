export function getPagination(page, limit) {
  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
}

export function getPaginationMeta({ page, limit, totalItems }) {
  const totalPages = Math.ceil(totalItems / limit);

  return {
    currentPage: page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
