# Contribution guidelines

You can contribute to this project by:

- creating [issues](https://github.com/frontacles/frontacles/issues/) to report a bug, request a feature or ask a question;
- opening [pull requests](https://github.com/frontacles/frontacles/issues/pulls) with improvements to the documentation or the code;
- participating in [discussions](https://github.com/frontacles/frontacles/discussions).

The following websites can provide tips and guidance on how to contribute to open source projects:

- [_How to submit a contribution_](https://opensource.guide/how-to-contribute/#how-to-submit-a-contribution) on _Open Source Guides_;
- [_GitHub Skills_](https://skills.github.com/) can help to understand GitHub.

Please do your best to communicate the necessary context so your contribution can be easily understood by other persons, and don’t be afraid if you struggle with English or if you are not sure about what you are doing.

## Bug reports

When reporting a bug, here are the informations you can provide to help other persons to help you:

- version of the library that you are using;
- technical context (like Node or browser version);
- a clear description of the issue you are facing, with the less possible code required to understand or reproduce the issue.

## Tests

Tests are using [Vitest](https://vitest.dev), and a command for [its UI](https://vitest.dev/guide/ui.html) is available (`npm run test:ui`).

[Playwright](https://playwright.dev) is used via [Vitest browser mode](https://vitest.dev/guide/browser) to test utilities using APIs that are only available in the browser. If you need a screenshot of a failing test for debug purpose, look into `.env.example`.

## Pull requests

Before submitting code, the changes you bring should:

- have written tests that don’t fail when they are run (`npm run test`)
- have updated [JSDoc comments](https://jsdoc.app/), updated types (`npm run types`) that are tested (`npm run test:types`);
- respect the code styles (`npm run lint:fix`) defined using [EditorConfig](https://editorconfig.org/) and [ESLint](https://eslint.org).

There’s a pull request template to remind you of that when you open a pull request.

### Benchmarks

See the [`README.md` dedicated to benchmarks](./benchs/README.md).
