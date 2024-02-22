import { ConflictException } from '@nestjs/common';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { ClinicDatabaseRepository } from '../../clinic/repositories/database-repository';
import { PsychologistEntity } from '../entities/psychologist/entity';
import { CreatePsychologistInputDto } from '../use-cases/create-psychologist/create-psychologist-dto';
import { DeletedPsychologistOutputDto } from '../use-cases/delete-psychologist/dto';
import { UpdatePsychologistInputDto } from '../use-cases/update-psychologist/update-psychologist-dto';
import { PsychologistDatabaseRepository } from './database-repository';

export class InMemoryPsychologistDatabaseRepository
  implements PsychologistDatabaseRepository
{
  private psychologists: PsychologistEntity[] = [];

  constructor(private clinicRepository: ClinicDatabaseRepository) {}

  async createPsychologist(psychologist: CreatePsychologistInputDto) {
    const isPsychologistExists = await this.findPsychologistByEmail(psychologist.email);

    if (isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_ALREADY_EXISTS'],
      );
    }

    const newPsychologist = new PsychologistEntity(psychologist);

    this.psychologists.push(newPsychologist);

    return newPsychologist;
  }

  async findPsychologistByEmail(email: string) {
    return (
      this.psychologists.find((psychologist) => psychologist.email === email) ?? null
    );
  }

  async findPsychologistById(id: string): Promise<PsychologistEntity | null> {
    return this.psychologists.find((psychologist) => psychologist.id === id) ?? null;
  }

  async getPsychologists(): Promise<PsychologistEntity[]> {
    return this.psychologists;
  }

  async updatePsychologist(newPsychologist: UpdatePsychologistInputDto): Promise<void> {
    const oldPsychologist = await this.findPsychologistById(newPsychologist.id);

    if (!oldPsychologist) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    const psychologistIndex = this.psychologists.findIndex((psychologist) => {
      return psychologist.id === newPsychologist.id;
    });

    const updatedPsychologist = Object.assign(oldPsychologist, {
      ...newPsychologist,
      updatedAt: new Date(),
    });

    this.psychologists[psychologistIndex] = updatedPsychologist;
  }

  async deletePsychologist(email: string): Promise<DeletedPsychologistOutputDto> {
    const isPsychologistExists = await this.findPsychologistByEmail(email);

    if (!isPsychologistExists) {
      throw new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_NOT_FOUND']);
    }

    const associatedClinics =
      await this.clinicRepository.deleteAllClinicsByPsychologistId(
        isPsychologistExists.id,
      );

    this.psychologists = this.psychologists.filter(
      (psychologists) => psychologists.email !== email,
    );

    return {
      deletedPsychologist: isPsychologistExists,
      associatedClinics,
    };
  }
}
