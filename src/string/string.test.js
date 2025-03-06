import { describe, expect, test } from 'vitest'
import { capitalize } from '..'

describe('string/capitalize', () => {
  test('capitalize() is a function', () => expect(capitalize).toBeInstanceOf(Function))

  test("capitalize Latin ('jean-roger')", () => expect(capitalize('jean-roger')).toBe('Jean-roger'))
  test("capitalize Greek ('έρημος')", () => expect(capitalize('έρημος')).toBe('Έρημος'))
  test("capitalize Russian ('мать')", () => expect(capitalize('мать')).toBe('Мать'))
  test("ignore numbers ('0 books')", () => expect(capitalize('0 books')).toBe('0 books'))
  test("ignore katakana ('スナップ')", () => expect(capitalize('スナップ')).toBe('スナップ'))
  test("ignore katakana ('沙漠')", () => expect(capitalize('沙漠')).toBe('沙漠'))
  test("ignore Arabic ('صحراء')", () => expect(capitalize('صحراء')).toBe('صحراء'))
  test("ignore Hebrew ('מִדְבָּר')", () => expect(capitalize('מִדְבָּר')).toBe('מִדְבָּר'))
})
