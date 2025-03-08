# Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

<!-- Nothing for now. -->

<!-- ⚠️ Before a new release, make sure the documentation doesn't contain any **unreleased** mention.  -->

Compare with [last published version](https://github.com/frontacles/frontacles/compare/0.2.3...main).

### New

- Add [`isEmail`](./README.md#isemail) to validate emails.

### Documentation

- It is now more explicit in types that `Email.canParse` expects a `string` or a `Stringable` (from `any|Email` to `any|string|Email|Stringable`).
- Rephrase email documentation.

### Under the hood

- Centralize all benchmarks in [`./benchs`](./benchs).
- Benchmark [`Email`](./benchs/url).

## v0.3.0 (2025-03-06)

Compare with [last published version](https://github.com/frontacles/frontacles/compare/0.2.2...0.2.3).

### New

#### Math

- Add [`clamp`](./README.md#clamp), a function to clamp a number in a given range.
- Add support for `Infinity` precision to the [`round` function](./README.md#round).

#### String

- Add [`capitalize`](./README.md#capitalize), a function to put the first letter of a word in uppercase.

### Fixed

- `Email` was considering as valid an email without username (e.g. `@domain.tld`). This is now fixed.

### Under the hood

- Shorten `round` by a couple of Bytes.
- Benchmark [`round` implementations](./benchs/math)
- Add [Valibot test suite](./src/url/test-utils/valibot-suite.js) to `Email` (all tests are passing!).

### Documentation

- Gather sizes in the documentation introduction.
- Group utils by categories (_Math_, _String_, _URL_)  to the documentation.
- Add pull request template.

## v0.2.2 (2025-03-01)

Compare with [last published version](https://github.com/frontacles/frontacles/compare/0.2.1...0.2.2).

### Breaking

- Make `Email.username` and `Email.hostname` mutable to follow `URL.username` and `URL.hostname` behavior.

### Improved

- Override documentation inherited from `URL` for `Email.username` and `Email.hostname`.

## v0.2.1 (2025-02-28)

Compare with [previous version](https://github.com/frontacles/frontacles/compare/0.2.0...0.2.1).

### Breaking

- Rename `Email.host` into `Email.hostname` to better match `URL`.

### Improved

- `Email` is now a couple of bytes lighter.

## v0.2.0 (2025-02-28)

Compare with [previous version](https://github.com/frontacles/frontacles/compare/dda10c3...0.2.0).

### New

- Add [`Email`](./README.md#email), a class to validate emails the same way browsers do, which is rock solid.

## v0.1.1 (2021-03-13)

Compare with [previous version](https://github.com/frontacles/frontacles/compare/986c759...dda10c3).

First published version.

## v0.1.0 (2021-03-13)

Almost published version.
