const { v4: uuidv4 } = require('uuid');
const AppointmentRepositoryDynamo = require('../out/AppointmentRepositoryDynamo');
const ListAppointmentsByDate = require('../../application/use-case/ListAppointmentsByDate');

const appointmentRepository = new AppointmentRepositoryDynamo();

module.exports.listAppointmentsByDateHandler = async (event) => {
  const date = event.queryStringParameters.date;
  const useCase = new ListAppointmentsByDate(appointmentRepository);
  const appointments = await useCase.execute(date);

  return {
    statusCode: 200,
    body: JSON.stringify(appointments)
  };
};

module.exports.createAppointmentHandler = async (event) => {
  const data = JSON.parse(event.body);
  const appointment = new Appointment(
    uuidv4(),
    data.clientId,
    data.date,
    data.time,
    new Date().toISOString(),
    new Date().toISOString(),
    data.comments,
    data.vehicleId,
    "HABILITADA"
  );

  const useCase = new CreateAppointment(appointmentRepository);
  await useCase.execute(appointment);

  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Appointment created', id: appointment.id })
  };
};

module.exports.updateAppointmentDateHandler = async (event) => {
  const { id } = event.pathParameters;
  const { date, time } = JSON.parse(event.body);

  const useCase = new UpdateAppointmentDate(appointmentRepository);
  await useCase.execute(id, date, time);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Appointment updated" })
  };
};

module.exports.cancelAppointmentHandler = async (event) => {
  const { id } = event.pathParameters;

  const useCase = new CancelAppointment(appointmentRepository);
  await useCase.execute(id);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Appointment canceled" })
  };
};