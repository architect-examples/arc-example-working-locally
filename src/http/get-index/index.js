exports.handler = async function http (req) {
  return {
    statusCode: 201,
    headers: { 'content-type': 'text/html; charset=utf8' },
    body: `<h1>hello world!</h1>`
  }
}
