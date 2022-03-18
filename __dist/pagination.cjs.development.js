"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var react = require("react");

/**
 * Crea un array di numeri che vanno dal parametro `from` al parametro `to` inclusi.
 * E.g. from: 2, to: 5 => [2, 3, 4, 5]
 */
function makeInclusiveNumberRange(from, to) {
  var result = [];

  for (var position = from; position <= to; position++) {
    result.push(position);
  }

  return result;
}

function usePagination(pagination, windowSize, currentUrl) {
  var previousPage = react.useMemo(
    function () {
      return Math.max(1, pagination.page - 1);
    },
    [pagination]
  );
  var nextPage = react.useMemo(
    function () {
      return Math.min(pagination.page + 1, pagination.totalPages);
    },
    [pagination]
  );
  var getPathForPage = react.useCallback(
    function (page) {
      var newUrl = new URL(currentUrl);
      newUrl.searchParams.set("pagina", String(page));
      return "" + newUrl.pathname + newUrl.search;
    },
    [currentUrl]
  );
  var isCurrentPage = react.useCallback(
    function (page) {
      return pagination.page === page;
    },
    [pagination]
  );
  var visiblePages = react.useMemo(
    function () {
      var currentPage = pagination.page,
        totalPages = pagination.totalPages; // se il numero totale di pagine è più piccolo di quelle da visualizzare...

      if (totalPages <= windowSize) {
        // ...visualizziamo da pagina 1 a quella che viene prima tra
        // totalPages e windowSize
        var lastPage = Math.min(totalPages, windowSize);
        return makeInclusiveNumberRange(1, lastPage); // se invece non possiamo visualizzare TUTTE le pagine perché il loro numero
        // totale di pagine + più grande della nostra finestra (7 pagine)...
      } else {
        // se la pagina corrente è tra le prime...
        if (currentPage <= Math.ceil(windowSize / 2)) {
          // ...visualizziamo da pagina 1 alla fine della finestra
          return makeInclusiveNumberRange(1, windowSize); // se la pagina corrente è tra le ultime...
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
          ); // se la pagina corrente è nel bel mezzo di una finestra...
        } else {
          // ...visualizziamo metà finestra prima e metà finestra dopo
          return makeInclusiveNumberRange(
            currentPage - Math.floor(windowSize / 2),
            currentPage + Math.floor(windowSize / 2)
          );
        }
      }
    },
    [pagination]
  );
  return {
    previousPage: previousPage,
    nextPage: nextPage,
    getPathForPage: getPathForPage,
    isCurrentPage: isCurrentPage,
    visiblePages: visiblePages,
  };
}

exports.usePagination = usePagination;
//# sourceMappingURL=pagination.cjs.development.js.map
