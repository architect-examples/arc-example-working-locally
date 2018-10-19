exports.handler = async function http(request) {
  return {
    status: 201,
    type: 'text/html; charset=utf8',
    body: `
      <h1>hello world!</h1>
    `
  }
}
