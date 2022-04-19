const AWS = require('aws-sdk')
const test = require('tape')
const sandbox = require('@architect/sandbox')
const arc = require('@architect/functions')

test('sandbox.start', async t=>{
  t.plan(1)
  await sandbox.start({ quiet: true })
  t.ok(true, 'started')
})

test('@events', async t=> {
  t.plan(1)
  // mock pingID
  let pingID = 'testing-ping'

  // send a few ping events
  await Promise.all([
    arc.events.publish({
      name: 'ping',
      payload: { pingID }
    }),
    arc.events.publish({
      name: 'ping',
      payload: { pingID }
    }),
    arc.events.publish({
      name: 'ping',
      payload: { pingID }
    })
  ])

  // wait a sec for everything to become consistent eventually
  await new Promise(res=> setTimeout(res, 1000))

  // see if testing-ping is in the db with three hits
  let data = await arc.tables()
  let result = await data.pings.get({ pingID })
  t.ok(result.hits, 'pong!')
  console.log(result)
})

test('sandbox.end', async t=>{
  t.plan(1)
  await sandbox.end()
  t.ok(true, 'closed')
})
