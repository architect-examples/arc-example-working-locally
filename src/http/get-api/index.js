exports.handler = async function http(request) {
  return {
    body: JSON.stringify({message: 'hello world'})
  }
}
