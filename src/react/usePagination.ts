import { useCallback, useMemo } from "react";

import { Pagination } from "../types";
import { makeInclusiveNumberRange } from "../utils";

interface UsePagination {
  previousPage: number;
  nextPage: number;
  getPathForPage(page: number): string;
  isCurrentPage(page: number): boolean;
  visiblePages: number[];
}

export function usePagination(
  pagination: Pagination,
  windowSize: number,
  currentUrl: string
): UsePagination {
  const previousPage = useMemo(
    () => Math.max(1, pagination.page - 1),
    [pagination]
  );

  const nextPage = useMemo(
    () => Math.min(pagination.page + 1, pagination.totalPages),
    [pagination]
  );

  const getPathForPage = useCallback(
    (page: number) => {
      const newUrl = new URL(currentUrl);
      newUrl.searchParams.set("pagina", String(page));
      return `${newUrl.pathname}${newUrl.search}`;
    },
    [currentUrl]
  );

  const isCurrentPage = useCallback(
    (page: number) => pagination.page === page,
    [pagination]
  );

  const visiblePages = useMemo(() => {
    const { page: currentPage, totalPages } = pagination;

    // se il numero totale di pagine è più piccolo di quelle da visualizzare...
    if (totalPages <= windowSize) {
      // ...visualizziamo da pagina 1 a quella che viene prima tra
      // totalPages e windowSize
      const lastPage = Math.min(totalPages, windowSize);
      return makeInclusiveNumberRange(1, lastPage);

      // se invece non possiamo visualizzare TUTTE le pagine perché il loro numero
      // totale di pagine + più grande della nostra finestra (7 pagine)...
    } else {
      // se la pagina corrente è tra le prime...
      if (currentPage <= Math.ceil(windowSize / 2)) {
        // ...visualizziamo da pagina 1 alla fine della finestra
        return makeInclusiveNumberRange(1, windowSize);

        // se la pagina corrente è tra le ultime...
      } else if (currentPage >= totalPages - Math.floor(windowSize / 2)) {
        // ...visualizziamo le pagine partendo dalla "windowSizeultima" fino
        // all'ultima.
        // E.g. totalPages = 10, windowSize = 7
        //      visualizziamo da 4 a 10
        //                       ^
        //                       |
        //                       +---- totalPages - windowSize + 1
        return makeInclusiveNumberRange(
          totalPages - windowSize + 1,
          totalPages
        );

        // se la pagina corrente è nel bel mezzo di una finestra...
      } else {
        // ...visualizziamo metà finestra prima e metà finestra dopo
        return makeInclusiveNumberRange(
          currentPage - Math.floor(windowSize / 2),
          currentPage + Math.floor(windowSize / 2)
        );
      }
    }
  }, [pagination]);

  return {
    previousPage,
    nextPage,
    getPathForPage,
    isCurrentPage,
    visiblePages,
  };
}
