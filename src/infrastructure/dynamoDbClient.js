const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000'
});

module.exports = dynamoDb;