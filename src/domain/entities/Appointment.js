class Appointment {
    constructor(id, clientId, date, time, createdAt, updatedAt, comments, vehicleId, status) {
      this.id = id;
      this.clientId = clientId;
      this.date = date;
      this.time = time;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.comments = comments;
      this.vehicleId = vehicleId;
      this.status = status;
    }
  }
  
  module.exports = Appointment;
  