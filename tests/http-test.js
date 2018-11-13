// tests/http-test.js
var test = require('tape')
var tiny = require('tiny-json-http')
var arc = require('@architect/architect')
var close

test('env', t=> {
  t.plan(1)
  t.ok(arc.sandbox.http, 'arc.sandbox.http exists in current scope')
})

/**
 * first we need to start the local http server
 */
var server
test('arc.sandbox.start', t=> {
  t.plan(1)
  arc.sandbox.start(function _start(err, _close) {
    close = _close
    t.ok(true, 'http server started on http://localhost:3333')
  })
})

/**
 * then we can make a request to it and check the result
 */
test('get /', t=> {
  t.plan(1)
  tiny.get({
    url: 'http://localhost:3333'
  }, 
  function _get(err, result) {
    if (err) throw err
    t.ok(result.body, 'got 200 response')
  })
})

let cat
test('post /api/cats', async t=> {
  t.plan(1)
  try {
    console.log('calling into tiny')
    let result = await tiny.post({
      url: 'http://localhost:3333/api/cats',
      data: {
        catID: ''+Date.now(),
        pplID: 'brianleroux',
        name: 'sutr0'
      }
    }) 
    console.log('calling aftetr await tiny')
    cat = result.body
    t.ok(cat.hasOwnProperty('catID'), 'got 200 response')
    console.log(cat)
  }
  catch(e) {
    console.log('calling tiny fail')
    t.fail(e)
    console.log(e)
  }
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
    console.log(result)
  }
  catch(e) {
    t.fail(e)
    console.log(e)
  }
})

test('get /api/cats', t=> {
  t.plan(1)
  tiny.get({
    url: 'http://localhost:3333/api/cats'
  }, 
  function _get(err, result) {
    if (err) throw err
    t.ok(result.body, 'got 200 response')
    console.log(JSON.stringify(result, null, 2))
  })
})

test('get /api/cats/:catID', async t=> {
  t.plan(1)
  try {
    let url = `http://localhost:3333/api/cats/${cat.catID}`
    let data = {pplID: 'brianleroux'}
    let result = await tiny.get({url, data}) 
    t.ok(result.body, 'got 200 response')
    console.log(JSON.stringify(result.body))
  }
  catch(e) {
    t.fail(e)  
  }
})

test('delete /api/cats/:catID', async t=> {
  t.plan(1)
  try {
    let url = `http://localhost:3333/api/cats/brianleroux-${cat.catID}`
    let result = await tiny.del({url}) 
    t.ok(result.body, 'got 200 response')
    console.log(JSON.stringify(result.body))
  }
  catch(e) {
    t.fail(e)  
  }
})

/** 
 * finally close the server so we cleanly exit the test
 */
test('server.close', t=> {
  t.plan(1)
  close()
  t.ok(true, 'server closed')
})
