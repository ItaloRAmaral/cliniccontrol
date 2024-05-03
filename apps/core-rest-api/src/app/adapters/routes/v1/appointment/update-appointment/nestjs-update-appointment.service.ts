import { Injectable } from '@nestjs/common';
import { AppointmentDatabaseRepository } from '../../../../../core/domains/appointment/repositories/database-repository';
import { UpdateAppointmentService } from '../../../../../core/domains/appointment/use-cases/update-single-appointment/update-appointment.service';

@Injectable()
export class NestjsUpdateAppointmentService extends UpdateAppointmentService {
  constructor(appointmentDatabaseRepository: AppointmentDatabaseRepository) {
    super(appointmentDatabaseRepository);
  }
}
