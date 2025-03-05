/**
 * Make sure a number stays between boundaries.
 * Follows {@link https://github.com/tc39/proposal-math-clamp TC39 proposal}.
 *
 * Examples:
 *
 * ```
 * clamp(17, 3, 8)  // 8
 * clamp(-3, 3, 8)  // 3
 * clamp(5, 3, 8)   // 5
 * ```
 *
 * @param {number} val The number you want to maintain inside boundaries.
 * @param {number} min The lowest permitted value.
 * @param {number} max The highest permitted value.
 */
export const clamp = (val, min, max) => Math.max(min, Math.min(max, val))

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

  /**
   * In order to avoid a crash (`10 ** Infinity` gives `NaN`) when precision is
   * `Infinity`, we replace it by the number of digits in the decimal part.
   */
  if (precision == Infinity) {
    precision = Number.isInteger(number) ? 0 : `${number}`.split('.')[1].length
  }

  precision = 10 ** precision

  return Math.round(number * precision) / precision
}
