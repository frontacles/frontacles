import { describe, expect, test } from 'vitest'
import { subArray, subSet } from '..'

const fruits = ['apple', 'apricot', 'grape', 'pear', 'tomato']
const goodForjuices = ['apple', 'grape', 'pear']
const goodForjuicesAsShuffledArray = ['pear', 'apple', 'grape']

const fruitsSet = new Set(fruits)
const goodForjuicesSet = new Set(goodForjuices)
const goodForjuicesAsShuffledArraySet = new Set(goodForjuicesAsShuffledArray)

describe('array/subArray', () => {
  test('subArray() is a function', () =>
    expect(subArray).toBeInstanceOf(Function))

  test('subArray([], [])', () =>
    expect(subArray([], [])).toBeTruthy())

  test('as array: needles items in haystack items', () =>
    expect(subArray(fruits, goodForjuices)).toBeTruthy())

  test('as array: haystack items in needles items', () =>
    expect(subArray(goodForjuices, fruits)).toBeFalsy())

  test('as array: shuffled needles items in haystack items', () =>
    expect(subArray(fruits, goodForjuicesAsShuffledArray)).toBeTruthy())
})

describe('array/subSet', () => {
  test('subSet() is a function', () =>
    expect(subSet).toBeInstanceOf(Function))

  test('subSet([], [])', () =>
    expect(subSet([], [])).toBeTruthy())

  test('as Set: needles items in haystack items', () =>
    expect(subSet(fruitsSet, goodForjuicesSet)).toBeTruthy())

  test('as Set: haystack items in needles items', () =>
    expect(subSet(goodForjuicesSet, fruitsSet)).toBeFalsy())

  test('as Set: shuffled needles items in haystack items', () =>
    expect(subSet(fruitsSet, goodForjuicesAsShuffledArraySet)).toBeTruthy())

  test('as array: needles items in haystack items', () =>
    expect(subSet(fruits, goodForjuices)).toBeTruthy())

  test('as array: haystack items in needles items', () =>
    expect(subSet(goodForjuices, fruits)).toBeFalsy())

  test('as array: shuffled needles items in haystack items', () =>
    expect(subSet(fruits, goodForjuicesAsShuffledArray)).toBeTruthy())
})
