import { describe, expect, test } from 'vitest'
import { clamp, round } from '..'

describe('math/round', () => {
  test('round() is a function', () => expect(round).toBeInstanceOf(Function))

  test('round(-1.2)', () => expect(round(-1.2)).toBe(-1))
  test('round(-1.2, 4)', () => expect(round(-1.2, 4)).toBe(-1.2))
  test('round(-1.278925, 3)', () => expect(round(-1.278925, 3)).toBe(-1.279))

  test('round(3.5)', () => expect(round(3.5)).toBe(4))

  test('round(π, 5)', () => expect(round(Math.PI, 5)).toBe(3.14159))
  test('round(π, 4)', () => expect(round(Math.PI, 4)).toBe(3.1416))

  test('round(687.3456, -1)', () => expect(round(687.3456, -1)).toBe(690))
  test('round(687.3456, -2)', () => expect(round(687.3456, -2)).toBe(700))
})

describe('math/clamp', () => {
  test('clamp() is a function', () => expect(clamp).toBeInstanceOf(Function))

  test('clamp(17, 3, 8)', () => expect(clamp(17, 3, 8)).toBe(8))
  test('clamp(-3, 3, 8)', () => expect(clamp(-3, 3, 8)).toBe(3))
  test('clamp(5, 3, 8)', () => expect(clamp(5, 3, 8)).toBe(5))

  test('clamp(-2, -0, 10)', () => expect(clamp(-2, -0, 10)).toBe(-0))
  test('clamp(-0, -0, 10)', () => expect(clamp(-0, -0, 10)).toBe(-0))
  test('clamp(0, -0, 10)', () => expect(clamp(0, -0, 10)).toBe(0))

  test('clamp(5, 0, Infinity)', () => expect(clamp(5, 0, Infinity)).toBe(5))
  test('clamp(-5, -Infinity, 10)', () => expect(clamp(-5, -Infinity, 10)).toBe(-5))
  test('clamp(Infinity, 0, 10)', () => expect(clamp(Infinity, 0, 10)).toBe(10))

  test('clamp(10, 5, 0) (min is bigger than max)', () => expect(clamp(10, 5, 0)).toBe(5))
})
