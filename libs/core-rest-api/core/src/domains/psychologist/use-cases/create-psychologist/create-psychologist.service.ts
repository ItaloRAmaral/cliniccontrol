import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BcryptHasherService } from '../../../../shared/cryptography/use-cases/bcrypt-hasher.service';
import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
import { applicationValidateOrReject } from '../../../../shared/validators/validate-or-reject';
import { PsychologistEntity } from '../../entities/psychologist/entity';
import { ICreatePsychologistServiceProps } from '../../interfaces/psychologist';
import { PsychologistDatabaseRepository } from '../../repositories/database-repository';
import { CreatePsychologistDto } from './create-psychologist-dto';

export class CreatePsychologistService {
  private hasherService: BcryptHasherService = new BcryptHasherService();

  constructor(private psychologistDatabaseRepository: PsychologistDatabaseRepository) {}

  async execute(
    createPsychologistDto: ICreatePsychologistServiceProps
  ): Promise<PsychologistEntity> {
    // Validate
    const createPsychologistDtoInstance = plainToInstance(
      CreatePsychologistDto,
      createPsychologistDto
    );
    await applicationValidateOrReject(createPsychologistDtoInstance);

    const isPsychologistExists =
      await this.psychologistDatabaseRepository.findPsychologistByEmail(
        createPsychologistDto.email
      );

    if (isPsychologistExists) {
      throw new ConflictException(
        PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_ALREADY_EXISTS']
      );
    }

    const hashedPassword = await this.hasherService.hash(createPsychologistDto.password);

    // Create
    const psychologist = await this.psychologistDatabaseRepository.createPsychologist({
      ...createPsychologistDto,
      password: hashedPassword,
    });

    return psychologist;
  }
}
