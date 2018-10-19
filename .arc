@app
testapp

@http
get /
get /api
get /api/cats
get /api/cats/:catID
post /api/cats
put /api/cats/:catID
delete /api/cats/:catID

@tables
cats
  pplID *String
  catID **String

ppl
  pplID *String

@indexes
ppl
  email *String
