/**
 * Round a number to provided precision.
 *
 * Examples:
 * - round(687.3456, 2)   // 687.35
 * - round(687.3456, 0)   // 687
 * - round(687.3456)      // 687
 * - round(687.3456, -1)  // 690
 */
export const round = (number, precision = 0) => {
  precision = 10 ** precision
  return Math.round(number * precision) / precision
}
