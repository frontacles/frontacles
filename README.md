# Frontacles

Cool utilities for front-end development (and potentially for Node).

> [!WARNING]  
> Under heavy development. We are only starting!

## `Email`

A class to instantiate an `Email` object or validate email addresses. It’s only [204 B compressed](https://bundlejs.com/?q=frontacles&treeshake=[{Email}]&config={%22compression%22%3A%22brotli%22}&bundle).

Unlike most libraries using [RegEx to validate a string is an email](https://github.com/colinhacks/zod/blob/e2b9a5f9ac67d13ada61cd8e4b1385eb850c7592/src/types.ts#L648-L663) (which is prone to [bugs](https://github.com/colinhacks/zod/issues/3913)), Frontacles `Email` relies on the same mechanism as your browser, making it robust, and very likely RFC compliant.

```js
import { Email } from 'frontacles/url/email'

const email = new Email('someone@domain.tld')
```

Get or set the username and the hostname separately.

```js
email.username // 'someone'
email.hostname // 'domain.tld'

email.hostname = 'newdomain.tld' // ✅ domain migrated

// destructuring also works
const { username, hostname } = new Email('someone@domain.tld')
```

An `Email` object is converted to a string when used along another string, or by directly calling `toString`.

```js
console.log(`email: ${email}`) // 'email: someone@newdomain.tld'
console.log(email.toString()) // 'someone@newdomain.tld'
```

Validate an email address with `Email.canParse`. It passes the complete Zod test suites, and beyond.

```js
Email.canParse('someone@domain.tld') // true
Email.canParse('invalid@email.com:3000') // false
```

Trying to instantiate an Email with an invalid address will throw. This behaviour is similar to the [`URL` constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), since `Email` relies on it under the hood.

```js
new Email('double@at@sign.com') // ❌ throw TypeError
```

Another behaviour from the `URL` class: you can pass an `Email` object to the `Email` constructor (or to `Email.canParse`, but it doesn’t really make sense).

```js
const email = new Email('someone@domain.tld')

const alsoEmail = new Email(email) // ✅ a new Email object!

Email.canParse(email) // ✅ true
```

## `round`

Round a number to the (optionally) provided precision. It’s only [64 B compressed](https://bundlejs.com/?q=frontacles&treeshake=[{round}]&config={%22compression%22%3A%22brotli%22}&bundle).

```js
import { round } from 'frontacles/math'

round(687.3456)      // 687
round(687.3456, 0)   // 687
round(687.3456, 2)   // 687.35
```

A negative precision will round up to multiple of tens:

```js
round(687.3456, -1)  // 690
round(687.3456, -2)  // 700
```

## Changelog

See [CHANGELOG.md](https://github.com/frontacles/frontacles/blob/main/CHANGELOG.md) or the [releases](https://github.com/frontacles/frontacles/releases).

## Browser and tooling support

`frontacles` is provided [as module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_compatibility) for [modern browsers usage](https://github.com/frontacles/frontacles/blob/main/browserslist) with standard JavaScript syntax:
- it is up to you to transpile it for legacy browsers;
- you can’t import it using `require('frontacles')`.

[Read more about ESModules](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Security

See the [security policy](https://github.com/frontacles/frontacles/blob/main/SECURITY.md).

## Contributing

See the [contributing guidelines](https://github.com/frontacles/frontacles/blob/main/CONTRIBUTING.md).

## License

The _datetime-attribute_ package is open-sourced software licensed under the [DWTFYWTPL](https://github.com/frontacles/frontacles/blob/main/LICENSE).
