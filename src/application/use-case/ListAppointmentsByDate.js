class ListAppointmentsByDate {
    constructor(appointmentRepository) {
      this.appointmentRepository = appointmentRepository;
    }
  
    async execute(date) {
      return await this.appointmentRepository.findByDate(date);
    }
  }
  
  module.exports = ListAppointmentsByDate;
  