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
