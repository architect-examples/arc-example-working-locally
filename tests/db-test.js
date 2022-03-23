const AWS = require('aws-sdk')
const test = require('tape')
const sandbox = require('@architect/sandbox')

/**
 * start the sandbox
 */
test('sandbox.start', async t=>{
  t.plan(1)
  await sandbox.start()
  t.ok(true, 'started')
})

/**
 * then we can work with the db using the vanilla `DynamoDB` client (or `DynamoDB.DocumentClient`)
 */
test('db', t=> {
  t.plan(1)
  // Note: we do not need to create tables, Sandbox did that when it booted thie project's app.arc file
  // Another note: Sandbox ports are dynamic, this is for example purposes only, we suggest @architect/functions
  var endpoint = new AWS.Endpoint('http://localhost:5555')
  var db = new AWS.DynamoDB({endpoint})
  db.listTables({}, function _list(err, result) {
    if (err) throw err
    t.ok(result, 'got result')
    console.log(result)
  })
})

/**
 * finally sandbox.end so we cleanly exit the test
 */
test('sandbox.end', async t=>{
  t.plan(1)
  await sandbox.end()
  t.ok(true, 'closed')
})
