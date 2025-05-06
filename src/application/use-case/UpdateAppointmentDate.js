class UpdateAppointmentDate {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(id, newDate, newTime) {
    const existingAppointment = await this.appointmentRepository.findByDateTime(newDate, newTime);

    if (existingAppointment && existingAppointment.id !== id) {
      const error = new Error("Time slot already booked");
      error.code = "TIME_SLOT_OCCUPIED";
      throw error;
    }

    await this.appointmentRepository.updateDate(id, newDate, newTime);
  }
}

module.exports = UpdateAppointmentDate;
