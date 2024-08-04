interface PaginationMetadata {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  links: {
    first: string | null;
    prev: string | null;
    next: string | null;
    last: string | null;
  };
}

export interface PaginationResponseDto<T> {
  data: T[];
  _meta: PaginationMetadata;
}
