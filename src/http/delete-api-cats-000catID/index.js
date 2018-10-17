let data = require('@architect/data')

exports.handler = async function http(req) {
  try {
    let parts = req.params.catID.split('-')
    let pplID = parts[0]
    let catID = parts[1]
    await data.cats.delete({pplID, catID})
    return {
      status: 201,
      type: 'application/json; charset=utf8',
      body: JSON.stringify({deleted: true}),
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
