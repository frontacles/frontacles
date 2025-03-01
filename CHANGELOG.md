# Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

Nothing for now.

<!-- ⚠️ Before a new release, make sure the documentation doesn't contain any **unreleased** mention.  -->

Compare with [last published version](https://github.com/frontacles/frontacles/compare/0.2.1...main).

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

- Add [`Email`](https://github.com/frontacles/frontacles#email), a class to validate emails the same way browsers do, which is rock solid.

## v0.1.1 (2021-03-13)

Compare with [previous version](https://github.com/frontacles/frontacles/compare/986c759...dda10c3).

First published version.

## v0.1.0 (2021-03-13)

Almost published version.
