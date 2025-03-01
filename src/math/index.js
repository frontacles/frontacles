/**
 * Round a number to the (optionally) provided precision.
 *
 * Examples:
 * - round(687.3456, 2)   // 687.35
 * - round(687.3456, 0)   // 687
 * - round(687.3456)      // 687
 * - round(687.3456, -1)  // 690
 *
 * @param {number} number
 * @param {number} [precision=0] Rounding precision
 */
export const round = (number, precision = 0) => {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}
