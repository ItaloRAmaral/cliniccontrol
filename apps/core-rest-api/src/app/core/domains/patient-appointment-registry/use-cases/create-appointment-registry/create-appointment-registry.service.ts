import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import {
  PATIENT_ERROR_MESSAGES,
  PSYCHOLOGIST_ERROR_MESSAGES,
} from '../../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../../shared/validators/validate-or-reject';
import { DataEncrypterService } from '../../../../shared/cryptography/use-cases/data-encrypter.service';

import { PatientDatabaseRepository } from '../../../patient/repositories/database-repository';
import { PsychologistDatabaseRepository } from '../../../psychologist/repositories/database-repository';
import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';

import { PatientAppointmentRegistryEntity } from '../../entities/registry/entity';
import { CreatePatientAppointmentRegistryInputDto } from './create-appointment-registry-dto';

export class CreatePatientAppointmentRegistryService {
  private dataEncrypter: DataEncrypterService = new DataEncrypterService();

  constructor(
    private psychologistDatabaseRepository: PsychologistDatabaseRepository,
    private patientDatabaseRepository: PatientDatabaseRepository,
    private patientAppointmentRegistryDatabaseRepository: PatientAppointmentRegistryDatabaseRepository,
  ) {}

  async execute(
    createPatientAppointmentRegistryDto: CreatePatientAppointmentRegistryInputDto,
  ): Promise<PatientAppointmentRegistryEntity> {
    // Validate
    const createPatientAppointmentRegistryDtoInstance = plainToInstance(
      CreatePatientAppointmentRegistryInputDto,
      createPatientAppointmentRegistryDto,
    );
    await applicationValidateOrReject(createPatientAppointmentRegistryDtoInstance);

    const isPatientExists = await this.patientDatabaseRepository.findPatientById(
      createPatientAppointmentRegistryDto.patientId,
    );

    const isPsychologistExists =
      await this.psychologistDatabaseRepository.findPsychologistById(
        createPatientAppointmentRegistryDto.psychologistId,
      );

    if (!isPatientExists) {
      throw new ConflictException(PATIENT_ERROR_MESSAGES['PATIENT_NOT_FOUND']);
    }

    if (!isPsychologistExists) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    const encryptedRegistry = this.dataEncrypter.encrypt(
      createPatientAppointmentRegistryDto.registry['observations'],
    );

    // Create
    const patientAppointmentRegistry =
      await this.patientAppointmentRegistryDatabaseRepository.createPatientAppointmentRegistry(
        {
          ...createPatientAppointmentRegistryDto,
          registry: {
            observations: encryptedRegistry,
          },
        },
      );

    return patientAppointmentRegistry;
  }
}
