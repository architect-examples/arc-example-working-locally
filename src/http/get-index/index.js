exports.handler = async function http(request) {
  console.log('never return')
  setTimeout(function() {
    console.log('calling inner function')
  }, 4*1000)
  return {
    status: 201,
    type: 'text/html; charset=utf8',
    body: `
      <h1>hello world!</h1>
    `
  }
}
