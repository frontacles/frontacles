import { describe, expect, test } from 'vitest'
import { Email } from '..'

describe.only('url/email', () => {
  test.todo('Email is a class')
  // test.todo('Email is a class', () => expect(round).toBeInstanceOf(Function))

  const myEmail = new Email('someone@domain.tld')

  test('username is domain.tld', () => expect(`${myEmail.username}`).toBe('someone'))
  test('host is domain.tld', () => expect(`${myEmail.host}`).toBe('domain.tld'))

  // casting to a string

  test('my email is someone@domain.tld', () => expect(`my email is ${myEmail}`).toBe('my email is someone@domain.tld'))
  test('cast to a string with String', () => expect((new String(myEmail)).toString()).toBe('someone@domain.tld'))
  test('cast to a string with `litteral`', () => expect(`${myEmail}`).toBe('someone@domain.tld'))

  // test('username and domain are no-writable', () => {
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
