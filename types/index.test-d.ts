import { expectError, expectType } from 'tsd'
import { Email } from '.'

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

// Stringification

expectType<string>(myEmail.toString())
expectType<string>(`${myEmail}`)
