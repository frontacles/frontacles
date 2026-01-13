import { expectError, expectType } from 'tsd'
import { clamp, Email, isEmail, round } from '../src/index.js'

/**
 * Test math/*
 */

expectType<number>(clamp(0, 1, 2))
expectType<number>(round(Math.PI, 3))

/**
 * Test url/isEmail
 */

const myEmail = new Email('someone@domain.tld')
expectType<boolean>(isEmail('someone@domain.tld'))
expectType<boolean>(isEmail(myEmail))

/**
 * Test url/Email
 */

// Correct instantiations

expectType<Email>(myEmail)
expectType<string>(myEmail.username)
expectType<string>(myEmail.hostname)
expectType<Email>(new Email(myEmail))

// Wrong instantiation

expectError(() => new Email(123))

// Check parsing

expectType<boolean>(Email.canParse('someone@domain.tld'))
expectType<boolean>(Email.canParse(myEmail))
expectType<boolean>(Email.canParse(new Date()))

// Stringification

expectType<string>(myEmail.toString())
expectType<string>(`${myEmail}`)
