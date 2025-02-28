# Frontacles

Cool utilities for front-end development (and potentially for Node).

> [!WARNING]  
> Under heavy development. We are only starting!

## Email

A class to instantiate an `Email` object or validate emails.

Unlike most libraries using [RegEx for emails](https://github.com/colinhacks/zod/blob/e2b9a5f9ac67d13ada61cd8e4b1385eb850c7592/src/types.ts#L648-L663) (and prone to [bugs](https://github.com/colinhacks/zod/issues/3913)), Frontacles `Email` class relies on the same mechanism as your browser to validate email addresses, making it robust, and very likely RFC compliant.

```js
import { Email } from 'frontacles/url/email'

const email = new Email('someone@domain.tld')
```

Get the username and the host separately.

```js
email.username // 'someone'
email.host // 'domain.tld'
```

Turn the email object into a string by using it along another string, or use `toString`.

```js
console.log(`email: ${email}`) // 'email: someone@domain.tld'
console.log(email.toString()) // 'someone@domain.tld'
```

Validate that a string is a valid email address. It passes the complete Zod test suites, and beyond.

```js
Email.canParse('someone@domain.tld') // true
Email.canParse('invalid@email.com:3000') // false
```

Trying to instantiate an Email with an invalid address will throw. This behaviour is similar to the [`URL` constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), since `Email` relies on it under the hood.

```js
new Email('double@at@sign.com') // ❌ throw TypeError
```
