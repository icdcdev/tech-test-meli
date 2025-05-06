class CancelAppointment {
  constructor(appointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(id) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      const error = new Error("Appointment not found");
      error.code = "NOT_FOUND";
      throw error;
    }

    appointment.status = "DESHABILITADA";
    appointment.updatedAt = new Date().toISOString();

    await this.appointmentRepository.save(appointment);
  }
}

module.exports = CancelAppointment;
