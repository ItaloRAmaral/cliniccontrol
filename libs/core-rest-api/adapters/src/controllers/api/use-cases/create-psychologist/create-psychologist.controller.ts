import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { CreatePsychologistService } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist.service';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/src/shared/validators/validate-or-reject';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('Core')
@Controller({
  path: 'core',
  version: ['0'],
})
export class CreatePsychologistController {
  constructor(private createPsychologistService: CreatePsychologistService) {}

  @Post()
  async execute(
    @Body() createPsychologistDto: CreatePsychologistDto
  ): Promise<PsychologistEntity | null> {
    try {
      console.log('entrei');
      const createPsychologistDtoInstance = plainToInstance(
        CreatePsychologistDto,
        createPsychologistDto
      );
      await applicationValidateOrReject(createPsychologistDtoInstance);

      const newPsychologist = await this.createPsychologistService.execute(
        createPsychologistDto
      );
      return newPsychologist as PsychologistEntity;
    } catch (error) {
      return null;
    }
  }
}
