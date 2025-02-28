# Frontacles

Cool utilities for front-end development (and potentially for Node).

> [!WARNING]  
> Under heavy development. We are only starting!

## Email

A class to instantiate an `Email` object or validate emails. It’s only [222 B compressed](https://bundlejs.com/?q=frontacles&treeshake=[{Email}]&config={%22compression%22%3A%22brotli%22}&bundle).

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

Another behaviour from the `URL` class: you can pass an `Email` object to the `Email` constructor or to `Email.canParse`.

```js
const email = new Email('someone@domain.tld')

const alsoEmail = new Email(email) // ✅ a new Email object!

Email.canParse(email) // ✅ true
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
