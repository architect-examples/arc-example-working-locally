let data = require('@architect/data')

exports.handler = async function http(req) {
  console.log('got post', req)

  try {
    if (!req.body.catID)
      throw ReferenceError('missing catID')

    if (!req.body.pplID)
      throw ReferenceError('missing pplID')

    if (!req.body.name)
      throw ReferenceError('missing name')

    let cat = await data.cats.put(req.body)

    return {
      status: 201,
      type: 'application/json; charset=utf8',
      body: JSON.stringify(cat, null, 2),
      cors: true
    }
  }
  catch(e) {
    return {
      status: 500,
      type: 'application/json; charset=utf8',
      body: JSON.stringify({
        name: e.name,
        message: e.message,
        stack:e.stack
      }, null, 2),
      cors: true,
    }
  }
}
