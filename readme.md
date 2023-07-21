# arc-example-working-locally

## Demonstrates Testing

- `@http` Lambda function resources
- `@event` Lambda function resources
- Reading and writing DynamoDB `@table` resources

## Start Project, Run Locally

1. Clone repo.
1. Download and install AWS [NoSQL Workbench](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/workbench.settingup.html)
1. Install AWS SDK globally: `npm i -g aws-sdk`
1. Install [Architect](https://github.com/architect/architect#installation) globally: `npm i -g @architect/architect`
1. Navigate to project directory
1. Install NPM packages: `npm install`
1. Run [sandbox](https://arc.codes/docs/en/reference/cli/sandbox): `arc sandbox` (Emulates AWS services, including DynamoDB)

## Manual Testing

1. GET `<localhost>/` (Should return "hello world!")
1. GET `<localhost>/api/cats` (Should return empty set)
1. POST `<localhost>/api/cats` (To create cats)
1. GET `<localhost>/api/cats` (Should return cats you added)
1. Open NoSQL Workbench > Operation Builder > Connection > arc-sandbox and look for table `testapp-staging-cats` to view cats you created.