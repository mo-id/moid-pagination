import { Pagination } from '../types';

export function createPagination(overrides?: Partial<Pagination>): Pagination {
  return {
    documentsCount: 42,
    documentsPerPage: 10,
    page: 1,
    totalPages: 5,
    ...overrides,
  };
}
