export function PaginationSharedPipeline({
  sortByFilter,
  page,
  limit,
}: {
  sortByFilter?: {
    [key: string]: number
  }
  page: number
  limit: number
}) {
  return [
    {
      $sort: sortByFilter || { createdAt: -1 },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]
}
