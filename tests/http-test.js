const test = require('tape')
const tiny = require('tiny-json-http')
const sandbox = require('@architect/sandbox')

/**
 * first we need to start the local http server
 */
test('sandbox.start', async t=> {
  t.plan(1)
  await sandbox.start({ quiet: true })
  t.ok(true, 'sandbox started on http://localhost:3333')
})

/**
 * then we can make a request to it and check the result
 */
test('get /', async t=> {
  t.plan(1)
  let result = await tiny.get({ url: 'http://localhost:3333' })
  t.ok(result, 'got 200 response')
  console.log(result)
})

// we will reuse this cat elsewhere
// tests are all in memory so this is fast!
let cat

test('post /api/cats', async t=> {
  t.plan(1)
  let result = await tiny.post({
    url: 'http://localhost:3333/api/cats',
    data: {
      catID: ''+Date.now(),
      pplID: 'brianleroux',
      name: 'sutr0'
    }
  })
  cat = result.body
  t.ok(cat.hasOwnProperty('catID'), 'got 200 response')
  console.log(cat)
})

test('put /api/cats/:catID', async t=> {
  t.plan(1)
  try {
    cat.name = 'Sutro'
    let result = await tiny.put({
      url: 'http://localhost:3333/api/cats/' + cat.catID,
      data: cat
    })
    t.ok(result.body, 'got 200 response')
    console.log(result.body)
  }
  catch(e) {
    t.fail(e)
  }
})

test('get /api/cats', async t=> {
  t.plan(1)
  let result = await tiny.get({
    url: 'http://localhost:3333/api/cats'
  })
  t.ok(result.body.Items, 'got 200 response')
  console.log(JSON.stringify(result.body.Items, null, 2))
})

test('get /api/cats/:catID', async t=> {
  t.plan(1)
  let url = `http://localhost:3333/api/cats/${cat.catID}`
  let data = {pplID: 'brianleroux'}
  let result = await tiny.get({ url, data })
  t.ok(result.body, 'got 200 response')
  console.log(result.body)
})

test('delete /api/cats/:catID', async t=> {
  t.plan(1)
  let url = `http://localhost:3333/api/cats/brianleroux-${cat.catID}`
  let result = await tiny.del({ url })
  t.ok(result.body, 'got 200 response')
  console.log(result.body)
})

/**
 * finally close the server so we cleanly exit the test
 */
test('sandbox.end', async t=> {
  t.plan(1)
  await sandbox.end()
  t.ok(true, 'sandbox ended')
})
