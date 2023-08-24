import { ConflictException, Injectable } from "@nestjs/common";
import { APPOINTMENT_ERROR_MESSAGES } from "../../../../shared/errors/error-messages";
import { AppointmentDatabaseRepository } from "../../repositories/database-repository";

@Injectable()
export class DeleteSingleAppointmentService {
  constructor(
    private appointmentDatabaseRepository: AppointmentDatabaseRepository
  ) {}

  async execute(
    appointmentId: string
  ) : Promise<void> {
    const isAppointmentExists = await this.appointmentDatabaseRepository.findSingleAppointmentById(appointmentId)

    if(!isAppointmentExists) {
      throw new ConflictException(APPOINTMENT_ERROR_MESSAGES['APPOINTMENT_NOT_FOUND'])
    }

    // Delete
    this.appointmentDatabaseRepository.deleteSingleAppointment(appointmentId)
  }
}
