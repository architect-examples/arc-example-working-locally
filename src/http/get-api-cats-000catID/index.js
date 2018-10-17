let data = require('@architect/data')

exports.handler = async function http(req) {
  try {
    let catID = req.params.catID
    let pplID = req.query.pplID
    let cat = await data.cats.get({catID, pplID})
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
