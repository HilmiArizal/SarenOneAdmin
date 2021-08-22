export interface Other {
    paginate_data: PaginateData;
}

export interface PaginateData {
    search: string | number;
    currentPage: string | number;
    perPage: string | number;
}
