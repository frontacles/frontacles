/** @file Alternatives implementations of `arrayIncludesAll()` for benchmark purpose. */

export const arrayIncludesAll = (haystack, needles) =>
  needles.every(needle => haystack.includes(needle))

export const arrayIncludesAllSupportingSet = (haystack, needles) =>
  [...needles].every(needle => [...haystack].includes(needle))

export const arrayIncludesAllWithSetSubset = (haystack, needles) =>
  new Set(needles).isSubsetOf(new Set(haystack))
