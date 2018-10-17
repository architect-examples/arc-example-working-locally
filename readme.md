# arc-example-working-locally

extends the tutorial from [https://arc.codes/guides/offline](arc.codes/guides/offline) with a JSON API that does classic CRUD

setup
```bash
npm i
npx hydrate
npx create
```

test
```bash
npm t
```

things to notice:

- tests are all in memory so they run very fast
- check out `@http` in `.arc`
- the api implementation in `./src/http` uses `@architect/data` to read/write dynamodb tables defined by `.arc`
- the tests in `tests/http-test.js`

---

teardown generated aws infra (but retain local code)

```bash
npx inventory nuke && ARC_NUKE=tables npx inventory nuke
```
