import { clamp, Email, isEmail, round } from 'frontacles'
import { expect } from 'tstyche'

/**
 * Test math/*
 */

expect(clamp(0, 1, 2)).type.toBe<number>()
expect(round(Math.PI, 3)).type.toBe<number>()

/**
 * Test url/isEmail
 */

const myEmail = new Email('someone@domain.tld')
expect(isEmail('someone@domain.tld')).type.toBe<boolean>()
expect(isEmail(myEmail)).type.toBe<boolean>()

/**
 * Test url/Email
 */

// Correct instantiations

expect(myEmail).type.toBe<Email>()
expect(myEmail.username).type.toBe<string>()
expect(myEmail.hostname).type.toBe<string>()
expect(new Email(myEmail)).type.toBe<Email>()

// Wrong instantiation

expect(Email).type.not.toBeConstructableWith(123)

// Check parsing

expect(Email.canParse('someone@domain.tld')).type.toBe<boolean>()
expect(Email.canParse(myEmail)).type.toBe<boolean>()
expect(Email.canParse(new Date())).type.toBe<boolean>()

// Stringification

expect(myEmail.toString()).type.toBe<string>()
expect(`${myEmail}`).type.toBe<string>()
