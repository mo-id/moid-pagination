import { Pagination } from "./Pagination.interface";

export interface Paginated<Entity> {
  results: Entity[];
  pagination: Pagination;
}
