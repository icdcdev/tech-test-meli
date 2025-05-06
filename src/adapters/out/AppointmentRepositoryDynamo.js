const dynamoDb = require('../../infrastructure/dynamoDbClient');

class AppointmentRepositoryDynamo {
    async findByDate(date) {
    const params = {
      TableName: process.env.APPOINTMENTS_TABLE,
      FilterExpression: "#date = :dateVal AND #status = :status",
      ExpressionAttributeNames: {
        "#date": "date",
        "#status": "status"
      },
      ExpressionAttributeValues: {
        ":dateVal": date,
        ":status": "HABILITADA"
      }
    };
  
    const result = await dynamoDb.scan(params).promise();
    return result.Items;
    }
}

module.exports = AppointmentRepositoryDynamo;
