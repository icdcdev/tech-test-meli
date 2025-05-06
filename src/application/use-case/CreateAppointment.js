class CreateAppointment {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(appointment) {
    const exists = await this.appointmentRepository.findByDateTime(appointment.date, appointment.time);
    if (exists) {
      const error = new Error("Time slot already booked");
      error.code = "TIME_SLOT_OCCUPIED";
      throw error;
    }

    await this.appointmentRepository.save(appointment);
    return appointment;
  }
}

module.exports = CreateAppointment;
