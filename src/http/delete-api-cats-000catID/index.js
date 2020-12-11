let arc = require('@architect/functions')

exports.handler = arc.http.async(handler)

async function handler (req) {
  try {
    let parts = req.params.catID.split('-')
    let pplID = parts[0]
    let catID = parts[1]
    let data = await arc.tables()
    await data.cats.delete({ pplID, catID })
    return {
      status: 201,
      json: { deleted: true }
    }
  }
  catch (e) {
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
