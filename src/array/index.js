/**
 * Check if all values of an array (needles) are in another one (haystack).
 *
 * @param {array} haystack The array with a greater or equal number of elements.
 * @param {array} needles The array with a smaller or equal number of elements.
 */
export const subArray = (haystack, needles) => needles.every(needle => haystack.includes(needle))

/**
 * Check if all values of a Set (needles) are in another one (haystack).
 *
 * @param {Set} haystack The Set with a greater or equal number of elements.
 * @param {Set} needles The Set with a smaller or equal number of elements.
 */
export const subSet = (haystack, needles) => subArray([...haystack], [...needles])

/**
 * Compare two arrays by looking at their length and primitives.
 * Returns false if one of the parameters is not an array.
 *
 * @param {array} a1 An array.
 * @param {array} a2 Another array.
 */
export const sameArray = (a1, a2) => a1.length == a2.length && subArray(a1, a2)
