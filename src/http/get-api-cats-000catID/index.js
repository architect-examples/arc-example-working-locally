let arc = require('@architect/functions')

exports.handler = arc.http.async(handler)

async function handler (req) {
  try {
    let catID = req.params.catID
    let pplID = req.query.pplID
    let data = await arc.tables()
    let cat = await data.cats.get({ catID, pplID })
    return {
      status: 201,
      json: cat,
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
