/** @file Alternatives implementations of `round()` for benchmark purpose. */

/** Supports `Infinity` as precision */
export const roundWithInfinity = (number, precision = 0) => {
  if (precision == Infinity) {
    return number
  }

  precision = 10 ** precision

  return Math.round(number * precision) / precision
}

/** Does not supports `Infinity` as precision. */
export const roundWithoutInfinity = (number, precision = 0) => {
  precision = 10 ** precision

  return Math.round(number * precision) / precision
}

/**
 * Does not reassign precision but duplicate Math.pow computation.
 * Does not supports `Infinity` as precision.
 */
export const roundDoublePrecisionCompute = (number, precision = 0) => {
  return Math.round(number * 10 ** precision) / 10 ** precision
}

/** Shortest in bytes */
export const roundDoublePrecisionComputeShortest = (number, precision = 0) => {

  // Testing precision avoids a crash because `10 ** Infinity` gives `NaN`.
  return precision == Infinity
    ? number
    : Math.round(number * 10 ** precision) / 10 ** precision
}
