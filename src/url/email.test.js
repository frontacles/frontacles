import { describe, expect, test } from 'vitest'
import { Email } from '..'
import { invalidEmailsFromZod, validEmailsFromZod } from './test-utils/zod-suite'

describe('url/email', () => {
  const myEmail = new Email('someone@domain.tld')

  test('Email class', () => expect(myEmail).toBeInstanceOf(Email))

  // test members

  test('email username', () => expect(myEmail.username).toBe('someone'))
  test('email host', () => expect(myEmail.host).toBe('domain.tld'))

  // casting to a string

  test('string using type casting', () => expect(`${myEmail}`).toBe('someone@domain.tld'))
  test('string using `.toString`', () => expect(myEmail.toString()).toBe('someone@domain.tld'))

  // can parse

  test('passes the Zod test suits for valid emails', () => expect(
    validEmailsFromZod.every(email => Email.canParse(email))
  ).toBeTruthy())

  test('passes the Zod test suits for invalid emails', () => expect(
    invalidEmailsFromZod.every(email => Email.canParse(email))
  ).toBeFalsy())

  // https://github.com/colinhacks/zod/issues/3913
  test('can parse o&leary@example.com', () => expect(Email.canParse('o&leary@example.com')).toBeTruthy())

  test('can parse an Email object', () => expect(Email.canParse(myEmail)).toBeTruthy())

  test('can’t parse a Date', () => expect(Email.canParse(new Date())).toBeFalsy())
  test('can’t parse a URL string with a port', () => expect(Email.canParse('someone@domain.tld:3000')).toBeFalsy())
  test('can’t parse a URL string with no username and with a port', () => expect(Email.canParse('domain.tld')).toBeFalsy())
  test('can’t parse a URL string with password', () => expect(Email.canParse('someone:password@domain.tld')).toBeFalsy())

  // immutability

  test('username and domain are non-writable', () => {
    expect(() => myEmail.username = 'someone-else').toThrow(TypeError)
    expect(() => myEmail.host = 'other-domain.tld').toThrow(TypeError)
  })
})
