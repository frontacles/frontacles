import { describe, expect, test } from 'vitest'
import { Email, isEmail } from '..'
import { invalidEmailsFromZod, validEmailsFromZod } from './test-utils/zod-suite'
import { invalidEmailsFromValibot, validEmailsFromValibot } from './test-utils/valibot-suite'
// import { validateEmail } from './test-utils/dom-powered-email-validation'

/**
 * @file Tests for `Email.parse` and `isEmail` have the same expectations.
 */

describe('url/email', () => {
  const myEmail = new Email('someone@domain.tld')

  test('Email class', () => expect(myEmail).toBeInstanceOf(Email))

  // `username` and `hostname`

  test('email username', () => expect(myEmail.username).toBe('someone'))
  test('email hostname', () => expect(myEmail.hostname).toBe('domain.tld'))

  test('destructure { username, hostname}', () => {
    const { username, hostname } = new Email('someone@domain.tld')
    expect(username).toBe('someone')
    expect(hostname).toBe('domain.tld')
  })

  // casting to a string

  test('string using type casting', () => expect(`${myEmail}`).toBe('someone@domain.tld'))
  test('string using `.toString`', () => expect(myEmail.toString()).toBe('someone@domain.tld'))

  // `canParse`, valid

  test('can parse a string', () => expect(Email.canParse('someone@domain.tld')).toBeTruthy())
  test('can parse an Email object', () => expect(Email.canParse(myEmail)).toBeTruthy())

  // `canParse`, invalid

  test('can’t parse a Date', () =>
    expect(Email.canParse(new Date())).toBeFalsy()
  )

  test('can’t parse a URL string with a port', () =>
    expect(Email.canParse('someone@domain.tld:3000')).toBeFalsy()
  )

  test('can’t parse a URL string with no username and with a port', () =>
    expect(Email.canParse('domain.tld')).toBeFalsy()
  )

  test('can’t parse a URL string with password', () =>
    expect(Email.canParse('someone:password@domain.tld')).toBeFalsy()
  )

  // `canParse`, Valibot and Zod test suites

  test('passes the Zod test suits for valid emails', () => expect(
    validEmailsFromZod.every(email => Email.canParse(email))
  ).toBeTruthy())

  test('passes the Zod test suits for invalid emails', () => expect(
    invalidEmailsFromZod.every(email => Email.canParse(email))
  ).toBeFalsy())

  test('passes the Valibot test suits for valid emails', () => expect(
    validEmailsFromValibot.every(email => Email.canParse(email))
  ).toBeTruthy())

  test('passes the Valibot test suits for invalid emails', () => expect(
    invalidEmailsFromValibot.every(email => Email.canParse(email))
  ).toBeFalsy())

  // https://github.com/colinhacks/zod/issues/3913
  test('can parse o&leary@example.com', () => expect(Email.canParse('o&leary@example.com')).toBeTruthy())

  // `canParse`, edge cases

  test('to parse without username', () => {
    /** @todo Should run in browser (https://vitest.dev/guide/browser/config.html). */
    // expect(validateEmail('@domain.tld')).toBeFalsy()
    expect(Email.canParse('@domain.tld')).toBeFalsy()
  })

  // mutability

  test('username and domain are mutable', () => {
    const otherEmail = new Email(myEmail)

    otherEmail.username = 'someone-else'
    expect(otherEmail.toString()).toBe('someone-else@domain.tld')

    otherEmail.hostname = 'other-domain.tld'
    expect(otherEmail.toString()).toBe('someone-else@other-domain.tld')
  })
})

describe('url/isEmail', () => {
  test('isEmail() is a function', () => expect(isEmail).toBeInstanceOf(Function))

  // Valid

  test('can parse someone@domain.tld', () => expect(
    isEmail('someone@domain.tld')).toBeTruthy()
  )

  test('can parse an `Email` object', () => expect(
    isEmail(new Email('someone@domain.tld'))).toBeTruthy()
  )

  // Invalid

  test('can’t parse a Date', () =>
    expect(isEmail(new Date())).toBeFalsy()
  )

  test('can’t parse a URL string with a port', () =>
    expect(isEmail('someone@domain.tld:3000')).toBeFalsy()
  )

  test('can’t parse a URL string with no username and with a port', () =>
    expect(isEmail('domain.tld')).toBeFalsy()
  )

  test('can’t parse a URL string with password', () =>
    expect(isEmail('someone:password@domain.tld')).toBeFalsy()
  )

  // Valibot and Zod test suites

  test('passes the Valibot test suits for valid emails', () => expect(
    validEmailsFromValibot.every(isEmail)).toBeTruthy()
  )

  test('passes the Valibot test suits for invalid emails', () => expect(
    invalidEmailsFromValibot.every(isEmail)).toBeFalsy()
  )

  test('passes the Zod test suits for valid emails', () => expect(
    validEmailsFromZod.every(isEmail)).toBeTruthy()
  )

  test('passes the Zod test suits for invalid emails', () => expect(
    invalidEmailsFromZod.every(isEmail)).toBeFalsy()
  )

  // Edge cases

  // https://github.com/colinhacks/zod/issues/3913
  test('o&leary@example.com is valid', () =>
    expect(isEmail('o&leary@example.com')).toBeTruthy()
  )

  test('to parse without username', () => {
    /** @todo Should run in browser (https://vitest.dev/guide/browser/config.html). */
    // expect(validateEmail('@domain.tld')).toBeFalsy()
    expect(isEmail('@domain.tld')).toBeFalsy()
  })
})
