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
  // note: we do not need to create the tables the
  // sandbox detected the app.arc and did that above
  var endpoint = new AWS.Endpoint('http://localhost:5000')
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
