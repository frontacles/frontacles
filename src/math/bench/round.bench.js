import { bench, describe } from 'vitest'
import {
  roundDoublePrecisionCompute,
  roundDoublePrecisionComputeShortest,
  roundWithInfinity,
  roundWithoutInfinity
} from './round.implementations'

describe('math/round', () => {
  // reassign imports due to https://github.com/vitest-dev/vitest/issues/6543
  const doublePrecisionCompute = roundDoublePrecisionCompute
  const shortest = roundDoublePrecisionComputeShortest
  const withInfinity = roundWithInfinity
  const withoutInfinity = roundWithoutInfinity

  bench('double compute', () => doublePrecisionCompute(Math.PI, 12))
  bench('double compute, 1 liner', () => shortest(Math.PI, 12))
  bench('with Infinity (current)', () => withInfinity(Math.PI, 12))
  bench('without Infinity', () => withoutInfinity(Math.PI, 12))
})
