const arc = require('@architect/functions')

exports.handler = arc.http.async(handler)

async function handler (req) {
  try {
    if (!req.body.catID)
      throw ReferenceError('missing catID')

    if (!req.body.pplID)
      throw ReferenceError('missing pplID')

    if (!req.body.name)
      throw ReferenceError('missing name')

    let {catID, pplID, name} = req.body
    
    let data = await arc.tables()

    await data.cats.update({
      Key: {
        catID, pplID
      },
      UpdateExpression: 'set #name = :name',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: {
        ':name': name
      },
    })

    return {
      status: 201,
      json: req.body,
    }
  }
  catch(e) {
    return {
      status: 500,
      json: {
        name: e.name,
        message: e.message,
        stack:e.stack
      }
    }
  }
}
