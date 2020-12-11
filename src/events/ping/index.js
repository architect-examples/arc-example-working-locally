let arc = require('@architect/functions')

exports.handler = arc.events.subscribe(handler)

async function handler ({ pingID }) {
  let data = await arc.tables()
  return data.pings.update({
    Key: { pingID },
    UpdateExpression: 'SET hits = if_not_exists(hits, :start) + :inc',
    ExpressionAttributeValues: {
      ':inc': 1,
      ':start': 0
    }
  })
}
