import { Pagination } from "../types";
interface UsePagination {
  previousPage: number;
  nextPage: number;
  getPathForPage(page: number): string;
  isCurrentPage(page: number): boolean;
  visiblePages: number[];
}
export declare function usePagination(
  pagination: Pagination,
  windowSize: number,
  currentUrl: string
): UsePagination;
export {};
