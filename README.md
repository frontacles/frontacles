# Frontacles

Cool utilities for front-end development (and potentially for Node).

> [!WARNING]  
> Under heavy development. We are only starting!

We love tiny bits (using brotli compression):

| categories | util | size |
| --- | --- | --- |
| math | [`clamp`](#clamp) | 35 B |
| math | [`round`](#round) | 44 B |
| string | [`capitalize`](#capitalize) | 40 B |
| url | [`Email`](#email) | 173 B |
|  | **everything** | 245 B |

## Math utils

### `clamp`

Clamp a number between two values. A clamped number stays within a specified range. If the number is lower than the minimum, the minimum value is returned. If the number is higher than the maximum, the maximum value is returned.

`clamp` needs 3 parameters:

1. `number`: the number to clamp
2. `min`: the smallest value your number can have
3. `max`: the highest value your number can have

```js
import { clamp } from 'frontacles/math'

clamp(17, 3, 8) // 8
clamp(-3, 3, 8) // 3
clamp(5, 3, 8)  // 5
```

`-0` and `Infinity` are accepted:

```js
clamp(-2, -0, 10)      // -0
clamp(5, 0, Infinity)  // 5
clamp(Infinity, 0, 10) // 10
```

> [!NOTE]  
> `clamp` mostly follows [`Math.clamp` TC39 proposal](https://github.com/tc39/proposal-math-clamp), except it doesn’t throw if you flip the order of the _min_ (2nd parameter) and _max_ (3rd parameter) numbers.


### `round`

Round a number to the (optionally) provided precision.

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

Trying to round `Infinity` or to round a number to an _infinite_ precision is also possible:

```js
round(Infinity, -2) // Infinity
round(17.853, Infinity // 17.853
```

## String utils

### `capitalize`

Put the first letter of a word in uppercase. It works for Latin, Greek and Cyrillic alphabets.

```js
capitalize('jean-roger')) // 'Jean-roger' (Latin)
capitalize('έρημος')) // 'Έρημος' (Greek)
capitalize('0 books') // 0 books
capitalize('صحراء') // 'صحراء' (Arabic)
```

> [!TIP]
> Before using `capitalize`, evaluate if [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/::first-letter) could be used instead.
>
> ```css
> .my-class::first-letter {
>   text-transform: uppercase;
> }
> ```

## URL utils

### `Email`

A class to instantiate an `Email` object or validate email addresses.

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

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) or the [releases](https://github.com/frontacles/frontacles/releases).

## Browser and tooling support

`frontacles` is provided [as module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_compatibility) for [modern browsers usage](./browserslist) with standard JavaScript syntax:
- it is up to you to transpile it for legacy browsers;
- you can’t import it using `require('frontacles')`.

[Read more about ESModules](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

## Security

See the [security policy](./SECURITY.md).

## Contributing

See the [contributing guidelines](./CONTRIBUTING.md).

## License

The _datetime-attribute_ package is open-sourced software licensed under the [DWTFYWTPL](./LICENSE).
