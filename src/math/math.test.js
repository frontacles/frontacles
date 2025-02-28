import { describe, expect, test } from 'vitest'
import { round } from '..'

describe('math/round', () => {
  test('round() is a function', () => expect(round).toBeInstanceOf(Function))

  test('round(-1.2)', () => expect(round(-1.2)).toBe(-1))
  test('round(-1.2, 4)', () => expect(round(-1.2, 4)).toBe(-1.2))
  test('round(-1.278925, 3)', () => expect(round(-1.278925, 3)).toBe(-1.279))

  test('round(3.5)', () => expect(round(3.5)).toBe(4))

  test('round(π, 5)', () => expect(round(Math.PI, 5)).toBe(3.14159))
  test('round(π, 4)', () => expect(round(Math.PI, 4)).toBe(3.1416))
})
