import { clamp, Email, isEmail, round, setAttributes } from 'frontacles'
import { expect } from 'tstyche'

/**
 * Test dom/*
 */

declare const div:HTMLDivElement
declare const collection:HTMLCollection
expect(setAttributes(div, { attr: 1 })).type.toBe<HTMLDivElement>()
expect(setAttributes(collection, { attr: 1 })).type.toBe<HTMLCollection>()
expect(setAttributes).type.toBeCallableWith(div, { attr: null })
expect(setAttributes).type.toBeCallableWith(div, { attr: undefined })
expect(setAttributes).type.toBeCallableWith(collection, { attr: 1 })
expect(setAttributes).type.toBeCallableWith(div, { class: 'btn' })
expect(setAttributes).type.toBeCallableWith(div, { class: ['btn'] })
expect(setAttributes).type.toBeCallableWith(div, { class: { btn: true }, data: { role: 'admin' } })
expect(setAttributes).type.toBeCallableWith(collection, { style: { color: 'red' } })
expect(setAttributes).type.not.toBeCallableWith(div, { attr: ['btn'] })

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
