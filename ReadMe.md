# Serverless example (AWS, PostgreSQL, Sequelize, Migration, Serverless)

Your project is ready for deployment on AWS in 10 minutes without any DevOps knowledge. Run and deploy in one click

## This example includes next AWS resources
- VPC (Network)
- RDS PostgresSQL (Database)
- RDS Proxy (Handle connection pool for lambda)
- Cognito (Identity provider)
- API Gateway (Gateway)
- KMS 

### Install

    npm install

### Migration [env] = (local or dev)

    npm run migrate:[env]:up // upgrade
    npm run migrate:[env]:down // downgrade

### Local run (update ./configuration/local.yaml)

    npm start

### Deploy on dev

    npm run deploy:dev

### Cognito (Authorization code)

    Before testing api's first create one user with AWS Cognito portal and then get authorization code with opening links that can be found in stack outputs with name [CognitoLoginURL]

    On callback redirect in browser cognito fill send authorization_code, copy that and replace in next command

    curl --location --request POST 'https://service-user-pool-domain-dev-develop.auth.us-east-1.amazoncognito.com/oauth2/token' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'grant_type=authorization_code' \
    --data-urlencode 'client_id=[CognitoClientId]' \
    --data-urlencode 'redirect_uri=[ServiceEndpoint]/auth/callback' \
    --data-urlencode 'code=[From login API]'

### Controllers (controllers)

    TODO

### Routes (routes)

If we want to map some action from the controller first we will create a YAML definition file where we will place all lambda definitions and attach an HTTP interface if needed

    countries-get-one:
      handler: ./controllers/countries.getOne
      timeout: 30
      vpc: ${self:custom.vpc}
      events:
      - http:
          path: countries/{id}
          method: get
          authorizer:
            name: MyAuthorizer
            type: COGNITO_USER_POOLS
            arn:
              Fn::GetAtt:
                - CognitoUserPool
                - Arn
          cors: true

### Authentication (authorizer)

To restrict access only for authorized users it's enough to add a provisioning authorizer

    authorizer:
      name: MyAuthorizer
      type: COGNITO_USER_POOLS
        arn:
          Fn::GetAtt:
            - CognitoUserPool
            - Arn

#### JSON schema (schemas)

JSON schema will be attached on API Gateway request and will be responsible to validate data before triggering lambda actions

    request:
       schemas:
          application/json: ${file(./schemas/userInfo.json)}


### Database (db)

    Postgres database models are defined with Sequelize ORM with migration scripts support.

### Configuration (configuration)

    There are two files dev and local, local is used for running serverless applications in the local environment, and dev is mapped from AWS resources outputs and these values are dynamically created. Database details we are saving on AWS Secrets manager

### Infrastructure (infrastructure)

    Check infrastructure folder for details


