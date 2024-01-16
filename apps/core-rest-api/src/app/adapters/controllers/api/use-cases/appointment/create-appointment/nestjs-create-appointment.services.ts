import { AppointmentDatabaseRepository } from '../../../../../../core/domains/appointment/repositories/database-repository';
import { CreateSingleAppointmentService } from '../../../../../../core/domains/appointment/use-cases/create-single-appointment/create-single-appointment.service';

export class NestjsCreateAppointmentService extends CreateSingleAppointmentService {
  constructor(appointmentDatabaseRepository: AppointmentDatabaseRepository) {
    super(appointmentDatabaseRepository);
  }
}
