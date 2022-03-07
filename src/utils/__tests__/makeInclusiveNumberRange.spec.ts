import { makeInclusiveNumberRange } from '../makeInclusiveNumberRange';

describe('utils / makeInclusiveNumberRange', () => {
  it.each([
    { from: 1, to: 1, result: [1] },
    { from: 1, to: 5, result: [1, 2, 3, 4, 5] },
    { from: -5, to: 0, result: [-5, -4, -3, -2, -1, 0] },
    { from: -2, to: 2, result: [-2, -1, 0, 1, 2] },
  ])('%o', ({ from, to, result }) => {
    expect(makeInclusiveNumberRange(from, to)).toEqual(result);
  });
});
