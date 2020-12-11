let arc = require('@architect/functions')

exports.handler = arc.http.async(handler)

async function handler (req) {
  try {
    let data = await arc.tables()
    let json = await data.cats.scan({})
    return { json }
  } 
  catch (e) {
    return {
      status: 502, 
      json: {
        name: e.name,
        message: e.message,
        stack:e.stack
      }
    }
  }
}
