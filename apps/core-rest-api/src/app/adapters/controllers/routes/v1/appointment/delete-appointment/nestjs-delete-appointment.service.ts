
import { Injectable } from '@nestjs/common';
import { AppointmentDatabaseRepository } from '../../../../../../core/domains/appointment/repositories/database-repository';
import { DeleteSingleAppointmentService } from '../../../../../../core/domains/appointment/use-cases/delete-single-appointment/delete-single-appointment.service';

@Injectable()
export class NestjsDeleteAppointmentService extends DeleteSingleAppointmentService {
  constructor(appointmentDatabaseRepository: AppointmentDatabaseRepository) {
    super(appointmentDatabaseRepository);
  }
}
