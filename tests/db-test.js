// tests/db-test.js
var AWS = require('aws-sdk')
var endpoint = new AWS.Endpoint('http://localhost:5000')
var db = process.env.NODE_ENV === 'testing'? new AWS.DynamoDB({endpoint}) : new AWS.DynamoDB

var test = require('tape')
var arc = require('@architect/workflows')

/**
 * first we need to start the local db server and grab a reference to the client
 */
var client 
test('arc.sandbox.db.start', t=>{
  t.plan(1)
  client = arc.sandbox.db.start(xxx=> t.ok(true, 'started'))
})

/**
 * then we can work with the db using the vanilla `DynamoDB` client (or `DynamoDB.DocumentClient`)
 */
test('db', t=> {
  t.plan(1)
  // note: we do not need to create the tables the
  // sandbox detected the .arc and did that above
  db.listTables({}, function _list(err, result) {
    if (err) throw err
    t.ok(result, 'got result')
    console.log(result) 
  })
})

/** 
 * finally close the db client so we cleanly exit the test
 */
test('arc.sandbox.db.close', t=>{
  t.plan(1)
  // finally we'll use that client reference from above to close the sandbox
  client.close()
  t.ok(true, 'closed')
})
