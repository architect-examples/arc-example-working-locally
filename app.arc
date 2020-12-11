@app
testapp

# define a CRUD api to the cats table
@http
get /
get /api/cats
get /api/cats/:catID
post /api/cats
put /api/cats/:catID
delete /api/cats/:catID

# define an SNS topic 'ping' and associate a Lambda to it
@events
ping

# define a DynamoDB tables 'cats', 'ppl', 'pings'
@tables
cats
  pplID *String
  catID **String

ppl
  pplID *String

pings
  pingID *String

# define a global secondary index on the 'ppl' table
@indexes
ppl
  email *String
