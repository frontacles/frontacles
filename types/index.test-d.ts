import { expectError, expectType } from 'tsd'
import { clamp, Email, round } from '.'

/**
 * Test url/email
 */

// Correct instantiations

const myEmail = new Email('someone@domain.tld')
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


/**
 * Test math
 */

expectType<number>(clamp(0, 1, 2))
expectType<number>(round(Math.PI, 3))
