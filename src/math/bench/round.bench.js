import { bench, describe } from 'vitest'
import { roundDoublePrecisionCompute, roundWithInfinity, roundWithoutInfinity } from './round.implementations'

// reassign imports due to https://github.com/vitest-dev/vitest/issues/6543

describe('math/round', () => {
  const doublePrecisionCompute = roundDoublePrecisionCompute
  const withInfinity = roundWithInfinity
  const withoutInfinity = roundWithoutInfinity

  bench('double compute', () => doublePrecisionCompute(Math.PI, 12))
  bench('with Infinity (current)', () => withInfinity(Math.PI, 12))
  bench('without Infinity', () => withoutInfinity(Math.PI, 12))
})
