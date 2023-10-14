import { ConflictException } from '@nestjs/common';
import { CLINIC_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { ClinicDatabaseRepository } from '../../repositories/database-repository';

export class DeleteClinicService {
  constructor(private clinicDatabaseRepository: ClinicDatabaseRepository) {}

  async execute(name: string): Promise<void> {
    // Validate if clinic exists in db
    const isClinicExists = await this.clinicDatabaseRepository.findClinicByName(
      name
    );

    if (!isClinicExists) {
      throw new ConflictException(CLINIC_ERROR_MESSAGES['CLINIC_NOT_FOUND']);
    }

    // Delete clinic
    await this.clinicDatabaseRepository.deleteClinic(name);
  }
}
