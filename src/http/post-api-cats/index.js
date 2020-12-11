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

    let data = await arc.tables()
    let cat = await data.cats.put(req.body)

    return {
      status: 201,
      json: cat
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
