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

  async save(appointment) {
    const params = {
      TableName: process.env.APPOINTMENTS_TABLE,
      Item: appointment
    };
    await dynamoDb.put(params).promise();
  }

  async updateDate(id, newDate, newTime) {
    const params = {
      TableName: process.env.APPOINTMENTS_TABLE,
      Key: { id },
      UpdateExpression: "set #date = :newDate, #time = :newTime, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#date": "date",
        "#time": "time",
        "#updatedAt": "updatedAt"
      },
      ExpressionAttributeValues: {
        ":newDate": newDate,
        ":newTime": newTime,
        ":updatedAt": new Date().toISOString()
      }
    };
    await dynamoDb.update(params).promise();
  }

  async cancel(id) {
    const params = {
      TableName: process.env.APPOINTMENTS_TABLE,
      Key: { id },
      UpdateExpression: "set #status = :status, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#status": "status",
        "#updatedAt": "updatedAt"
      },
      ExpressionAttributeValues: {
        ":status": "DESHABILITADA",
        ":updatedAt": new Date().toISOString()
      }
    };
    await dynamoDb.update(params).promise();
  }
}

module.exports = AppointmentRepositoryDynamo;
