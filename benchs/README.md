# Benchmarks

Benchmarks are using Vitest and are used for decision/information purpose when hesitating between multiple implementations. Their results are pasted in `.txt` files along the `.bench.js` files. For now, no benefit is seen to run benchmarks in the CI or to keep their [JSON output](https://vitest.dev/config/#benchmark-outputJson) since results may vary across environments (is it true?).

In benchmarks, imported members should not be used directly (see [`round.bench.js`](./math/round.bench.js) as example) because it would [create irregular results](https://github.com/vitest-dev/vitest/issues/6543).

Benchmarks live in [their own folder](./), having its own `package.json`. As we sometimes benchmark against other libraries, we need to install them; having a separated NPM space avoids bloating the root `/node_modules` with packages that we don’t to be installed in the CI pipeline. With only a couple of other libraries (validation libraries), it’s already around 30 MB saved.

From the bench folder, you can run benchmarks using `npm run bench`.
