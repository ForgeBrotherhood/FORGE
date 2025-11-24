// packages/shared-types/src/api.ts

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiMeta {
  requestId?: string;
}

export interface ApiResponse<T> {
  data: T;
  meta?: ApiMeta;
}

export interface ApiListMeta extends ApiMeta {
  total?: number;
  page?: number;
  pageSize?: number;
  hasMore?: boolean;
}

export interface ApiListResponse<T> {
  data: T[];
  meta?: ApiListMeta;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
