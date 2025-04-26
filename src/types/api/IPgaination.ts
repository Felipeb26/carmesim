export interface IPagination<T> {
    data: T[],
    currentPage: number,
    totalPages: number,
    totalItems: number,
    pageSize: number
}