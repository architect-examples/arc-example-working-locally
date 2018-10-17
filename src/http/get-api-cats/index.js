let data = require('@architect/data')

exports.handler = async function http(req) {

  let cors = true
  let type = 'application/json; charset=utf8'
  let status = 201
  let body

  try {
    let cats = await data.cats.scan({})
    body = JSON.stringify(cats, null, 2)
  }
  catch(e) {
    status = 500
    body =  JSON.stringify({
      name: e.name,
      message: e.message,
      stack:e.stack
    })
  }

  return {cors, type, status, body}
}
