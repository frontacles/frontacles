import { describe, expect, test } from 'vitest'
import { Email } from '..'
import { invalidEmailsFromZod, validEmailsFromZod } from './utils/emails-to-test'

describe('url/email', () => {
  test.todo('Email is a class')
  // sometest.todo('Email is a class', () => expect(round).toBeInstanceOf(Function))

  const myEmail = new Email('someone@domain.tld')

  test('username is domain.tld', () => expect(`${myEmail.username}`).toBe('someone'))
  test('host is domain.tld', () => expect(`${myEmail.host}`).toBe('domain.tld'))

  // casting to a string

  test('my email is someone@domain.tld', () => expect(`my email is ${myEmail}`).toBe('my email is someone@domain.tld'))
  test('cast to a string with String', () => expect((new String(myEmail)).toString()).toBe('someone@domain.tld'))
  test('cast to a string with `litteral`', () => expect(`${myEmail}`).toBe('someone@domain.tld'))

  // can parse

  // https://github.com/colinhacks/zod/issues/3913
  // https://github.com/colinhacks/zod/blob/e2b9a5f9ac67d13ada61cd8e4b1385eb850c7592/src/types.ts#L648-L663
  // https://github.com/colinhacks/zod/blob/e2b9a5f9ac67d13ada61cd8e4b1385eb850c7592/deno/lib/__tests__/string.test.ts#L42-L154
  test('it can parse o&leary@example.com', () => expect(Email.canParse('o&leary@example.com')).toBeTruthy())
  test('it can parse all valid examples from zod', () => expect(
    validEmailsFromZod.every(email => Email.canParse(email))
  ).toBeTruthy())

  test('it can parse all invalid examples from zod', () => expect(
    invalidEmailsFromZod.every(email => Email.canParse(email))
  ).toBeFalsy())

  // sometest('username and domain are no-writable', () => {
  //   expect(myEmail.username = 'someone-else').toThrow()
  //   expect(myEmail.host = 'other-domain.tld').toThrow()
  // })

  // const myEmail = new Email('mehdi@domain.tld')
  // console.log(Email.canParse('mehdi@domain.tld'))
  // // console.log(Email.canParse('mehdi@domain.tld?no'))
  // // const notMyEmail = new Email('mehdi@domain.tld?ki')
  // // console.log(new Email(new Date()))
  // console.log(myEmail.toString()) // mehdi
})
