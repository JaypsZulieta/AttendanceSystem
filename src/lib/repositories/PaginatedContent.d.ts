export type PaginatedContent<TEntity> = {
    totalItems: number,
    currentPage: number,
    totalPages: number,
    hasPreviousPages: boolean,
    hasNextPage: boolean,
    content: TEntity[]
}