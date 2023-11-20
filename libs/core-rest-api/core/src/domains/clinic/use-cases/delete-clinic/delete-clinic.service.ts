import { ConflictException } from '@nestjs/common';
import { CLINIC_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';
import { DeletedClinicInfo } from './dto';

export class DeleteClinicService {
  constructor(private clinicDatabaseRepository: ClinicDatabaseRepository) {}

  async execute(name: string, psychologistId: string): Promise<DeletedClinicInfo> {
    // Validate if clinic exists in db
    const isClinicExists = await this.clinicDatabaseRepository.findClinicByNameAndPsychologistId(
      name, psychologistId
    );

    if (!isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    // Delete clinic
    return await this.clinicDatabaseRepository.deleteClinic(name, psychologistId);
  }
}
