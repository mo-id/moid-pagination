import { renderHook as render } from '@testing-library/react-hooks';

import { createPagination } from '../../test-utils';
import { Pagination } from '../../types';
import { usePagination } from '../usePagination';

describe('hooks / useBoolean', () => {
  function renderHook(
    pagination: Pagination,
    windowSize: number = 7,
    currentUrl = 'https://www.operaclick.com'
  ) {
    return render(() => usePagination(pagination, windowSize, currentUrl));
  }

  it.each([
    [2, 3, 10],
    [1, 1, 10],
  ])(
    'computes %s as previous page when current one is %s of %s',
    (expected, page, totalPages) => {
      const { result } = renderHook(createPagination({ page, totalPages }));
      expect(result.current.previousPage).toBe(expected);
    }
  );

  it.each([
    [8, 7, 10],
    [10, 10, 10],
  ])(
    'computes %s as next page when current one is %s of %s',
    (expected, page, totalPages) => {
      const { result } = renderHook(createPagination({ page, totalPages }));
      expect(result.current.nextPage).toBe(expected);
    }
  );

  describe('getPathForPage', () => {
    it.each([
      ['/?pagina=1', 1],
      ['/?pagina=3', 3],
    ])('returns %s as pathname when page is %s', (expected, page) => {
      const { result } = renderHook(createPagination({ page }));
      expect(result.current.getPathForPage(page)).toBe(expected);
    });
  });

  describe('isCurrentPage', () => {
    it.each([
      [true, 1, createPagination({ page: 1 })],
      [false, 2, createPagination({ page: 1 })],
    ])('returns %s for page is %s in %s', (expected, page, pagination) => {
      const { result } = renderHook(pagination);
      expect(result.current.isCurrentPage(page)).toBe(expected);
    });
  });

  describe('visiblePages', () => {
    describe('when the window size is bigger than the total number of pages', () => {
      it.each([
        [[1, 2, 3, 4], 1, 4, 7],
        [[1, 2, 3, 4], 2, 4, 7],
        [[1, 2, 3, 4], 3, 4, 7],
        [[1, 2, 3, 4], 4, 4, 7],
      ])(
        'returns %s when the current page is %s of %s with a window size of %s',
        (expected, page, totalPages, windowSize) => {
          const { result } = renderHook(
            createPagination({ page, totalPages }),
            windowSize
          );
          expect(result.current.visiblePages).toEqual(expected);
        }
      );
    });

    describe('when the window size is smaller than the total number of pages', () => {
      it.each([
        [[1, 2, 3, 4, 5, 6, 7], 1, 10, 7],
        [[1, 2, 3, 4, 5, 6, 7], 2, 10, 7],
        [[1, 2, 3, 4, 5, 6, 7], 3, 10, 7],
        [[1, 2, 3, 4, 5, 6, 7], 4, 10, 7],
        [[2, 3, 4, 5, 6, 7, 8], 5, 10, 7],
        [[3, 4, 5, 6, 7, 8, 9], 6, 10, 7],
        [[4, 5, 6, 7, 8, 9, 10], 7, 10, 7],
        [[4, 5, 6, 7, 8, 9, 10], 8, 10, 7],
        [[4, 5, 6, 7, 8, 9, 10], 9, 10, 7],
        [[4, 5, 6, 7, 8, 9, 10], 10, 10, 7],
      ])(
        'returns %s when the current page is %s of %s with a window size of %s',
        (expected, page, totalPages, windowSize) => {
          const { result } = renderHook(
            createPagination({ page, totalPages }),
            windowSize
          );
          expect(result.current.visiblePages).toEqual(expected);
        }
      );
    });
  });
});
