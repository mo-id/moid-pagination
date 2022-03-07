/**
 * Crea un array di numeri che vanno dal parametro `from` al parametro `to` inclusi.
 * E.g. from: 2, to: 5 => [2, 3, 4, 5]
 */
export function makeInclusiveNumberRange(from: number, to: number): number[] {
  const result: number[] = [];

  for (let position = from; position <= to; position++) {
    result.push(position);
  }

  return result;
}
