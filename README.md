# Frontacles

Cool utilities for front-end development (and potentially for Node).

> [!WARNING]  
> Under heavy development. We are only starting!

We love tiny bits (using brotli compression):

| category | util | size | description |
| --- | --- | --- | --- |
| DOM | [`setAttributes`](#setattributes) | 349 B | Update multiple attributes on multiple HTML elements |
| math | [`clamp`](#clamp) | 35 B | Make sure a number stays in a given range. |
| math | [`round`](#round) | 38 B | Round a number to a given precision |
| string | [`capitalize`](#capitalize) | 40 B | Capitalize the first letter of a string. |
| URL | [`isEmail`](#isemail) | 86 B | Wheither a variable is a valid email address. |
| URL | [`Email`](#email) | 173 B | An `Email` object with validation and separate access to an email username and domain. |
|  | **everything** | 328 B | |

## DOM utils

### `setAttributes`

Updates in bulk the attribute(s) of one or many HTML element(s).

```js
import { setAttributes } from 'frontacles/dom'

const widget = getElementById('animal-widget')

// `<div name="Animal widget" loading="true">`
setAttributes(widget, {
  name: 'Animal widget'
  loading: true,
})
```

To remove an attribute, set its value to `false`, `null` or `undefined`.

```js
// `<div name="Animal widget">`
setAttributes(widget, { loading: false })

// `<div name="Animal widget" loading="false">`
setAttributes(widget, { loading: 'false' })
```

Providing multiple HTML elements (array or [HTML collection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)) sets the same attributes values to all of them:

```js
const animals = widget.getElementsbyClassName('.list-item')

// `<li class="list-item" data-cat="animals">cat</li>`
setAttributes(animals, { 'data-cat': 'animals' })
```

When an attribute is an object, its properties are converted to `attrName-propName` attributes, making it helpful for any bulk update of `aria-*` or `data-*` attributes:

```js
setAttributes(el, {
  loading: true,
  aria: {
    busy: true,
    live: 'polite',
  },
  data: {
    category: 'boats',
    'max-items': 12,
  },
  user: {
    id: 4,
    name: 'Liz',
  },
})
```

The previous example gives:

```html
<div
  loading="true"
  aria-busy="true" aria-live="polite"
  data-category="boats" data-max-items="12"
  user-id="4" user-name="Liz"
>
```

Like for non-object attributes, using `false`, `null` or `undefined` as property value will remove the matching attribute from the HTML:

```js
setAttributes(el, { data: { 'max-items': null }}) // no more `data-max-items`
```

> [!NOTE]  
> `data` is using [`dataset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) under the hood but differs from it: in the previous example of property removal, `el.dataset.maxItems = null` would have stringify `null` into `'null'`, giving `data-max-items="null"` instead of a removal. `setAttributes` applies this logic to all types of values.


`class` deals with CSS classes. It can be an array of CSS classes or a string containing one or more (space-separated) classes that will be added to the element(s). It can also be an object in the form of `{ className: state }`, defining of each class should be added or removed from the element.

```js
// <div class="btn btn--xl">
setAttributes(el, { class: { btn: true, 'btn--xl': true }})

// <div class="btn btn--xl card__btn">
setAttributes(el, { class: ['card__btn'] })

// <div class="btn btn--xl card__btn card__btn--special">
setAttributes(el, { class: 'card__btn--special' })

// <div class="btn btn--xl card__btn card__btn--special card__btn--1 card__btn--2">
setAttributes(el, { class: 'card__btn--1 card__btn--2' })

// <div class="btn card__btn card__btn--special card__btn--1 card__btn--2">
setAttributes(el, { class: { 'btn--xl': false }})
```

When `style` is an object, it behaves like [`HTMLElement.style`](). When it’s a string, it completely replaces the attribute.

```js
// <div style="color: red; opacity: 0.9">
setAttributes(el, {
  style: {
    color: 'red',
    opacity: .9
  }
})

// <div style="color: red;">
setAttributes(el, { style: { opacity: null }})

// <div style="gap: 2px; opacity: .9;">
setAttributes(el, { style: 'gap: 2px; opacity: .9;')
```

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

Round a number to the (optionally) provided decimal precision. The default precision is 0 (no decimal).

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

Using `Infinity` is also possible:

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

### `isEmail`

Tells whether a string is a valid email.

```js
isEmail('someone@domain.tld') // true
isEmail('invalid@email.com:3000') // false
```

> [!TIP]  
> Should I use `isEmail` or [`Email.canParse`](#emailcanparse) to validate emails?
>
> Short answer: use `isEmail`.
>
> <details>
> <summary>Nuanced answer</summary>
>
> Your use case:
>
> - If you **only need to validate** email addresses, use `isEmail`.
> - If you also need to be able to get or set an email username or hostname **independently**, use `Email.canParse`.
>
> When using the `Email` class, you can still use `isEmail` if you want ultra-performance (e.g. your Node API validates tons of emails per seconds) because `isEmail` is 6✕ faster, at the cost of a bit less than 100 Bytes (compressed).
>
> The reason `isEmail` is faster is that it relies on a single RegExp while `Email.canParse` uses the browser built-in, which results in a bit more of computation, but with less code. For now, it’s not planned to use `isEmail` implementation in `Email.canParse` as it would increase its size by 50 Bytes.
>
> Keep in mind that **`Email.canParse` is fast enough** for the 99% use cases. Despite their implementation difference, both behave the same and pass the same tests.
> </details>

### `Email`

A class to instantiate an `Email` object or validate email addresses. It extends the [`URL` object](https://developer.mozilla.org/en-US/docs/Web/API/URL) and has similar predictable behaviors.

#### `Email.constructor`

```js
import { Email } from 'frontacles/url/email'

const email = new Email('someone@domain.tld')
```

Trying to instantiate an Email with an invalid address will throw. This behaviour is similar to the [`URL` constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), since `Email` relies on it under the hood.

```js
new Email('double@at@sign.com') // ❌ throw TypeError
```

Another behaviour from `URL`: passing an `Email` object to the `Email` constructor or to [`Email.canParse`](#emailcanparse) is possible.

```js
const email = new Email('someone@domain.tld')
const alsoEmail = new Email(email) // ✅ a new Email object!
Email.canParse(email) // ✅ true
```

#### `.username` and `.hostname`

Get or set the email username and hostname separately.

```js
email.username // 'someone'
email.hostname // 'domain.tld'

email.hostname = 'newdomain.tld' // ✅ domain migrated

// destructuring also works
const { username, hostname } = new Email('someone@domain.tld')
```

#### `.toString`

In a string context, an `Email` object is automatically converted to a string, or manually by calling the `toString` method.

```js
console.log(`email: ${email}`) // 'email: someone@newdomain.tld'
console.log(email.toString()) // 'someone@newdomain.tld'
```

#### `Email.canParse`

Validate an email address with `Email.canParse`.

Unlike most libraries using [RegExp to validate a string is an email](https://github.com/colinhacks/zod/blob/e2b9a5f9ac67d13ada61cd8e4b1385eb850c7592/src/types.ts#L648-L663) (which is prone to [bugs](https://github.com/colinhacks/zod/issues/3913)), Frontacles `Email` relies on the built-in `URL` mechanisms, making it robust, and very likely RFC compliant. It passes [popular libraries test suites](./src/url/test-utils), and beyond.

```js
Email.canParse('someone@domain.tld') // true
Email.canParse('invalid@email.com:3000') // false
```

If `canParse` is all you need from the `Email` class, consider using [isEmail](#isemail) instead.

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
