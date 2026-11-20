import { bench, describe } from 'vitest'
import {
  arrayIncludesAll,
  arrayIncludesAllSupportingSet,
  arrayIncludesAllWithSetSubset
} from './arraysIncludeAll.implementations'

const includesAll = arrayIncludesAll
const includesAllSupportingSet = arrayIncludesAllSupportingSet
const includesAllWithSetSubset = arrayIncludesAllWithSetSubset

const fruits = ['apple', 'apricot', 'grape', 'pear', 'tomato']
const fruitsSet = new Set(fruits)
const goodForjuices = ['apple', 'grape', 'pear']
const goodForjuicesSet = new Set(goodForjuices)

describe('math/arrayIncludesAll', () => {
  bench('includes all', () => includesAll(fruits, goodForjuices))
  bench('includes all using Set(array)', () => includesAllSupportingSet(fruits, goodForjuices))
  bench('includes all using Set(array).isSubsetOf', () => includesAllWithSetSubset(fruits, goodForjuices))
  bench('includes all using Set(Set)', () => includesAllSupportingSet(fruitsSet, goodForjuicesSet))
  bench('includes all using Set(Set).isSubsetOf', () => includesAllWithSetSubset(fruitsSet, goodForjuicesSet))
  bench('directly using Set(Set).isSubsetOf', () => goodForjuicesSet.isSubsetOf(fruitsSet))
})
