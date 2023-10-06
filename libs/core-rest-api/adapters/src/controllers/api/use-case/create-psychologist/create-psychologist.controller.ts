// eslint-disable-next-line @nx/enforce-module-boundaries
import { PostgreSqlPrismaOrmService } from '@clinicControl/core-rest-api/adapters/src/database/infra/prisma/prisma.service';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/src/shared/validators/validate-or-reject';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiKeyGuard } from '../../guards/api-key.guard';
import { NestjsCreatePsychologistService } from './nestjs-create-psychologist.service';

@ApiTags()
@Controller({
  path: 'psychologist',
})
export class CreatePsychologistController {
  constructor(
    private prisma: PostgreSqlPrismaOrmService,
    private createPsychologistService: NestjsCreatePsychologistService
  ) {}
  @Post('create')
  @UseGuards(ApiKeyGuard)
  async execute(
    @Body() createPsychologistDto: CreatePsychologistDto
  ): Promise<null | undefined | void> {

    try {
      const createPsychologistDtoInstance = plainToInstance(
        CreatePsychologistDto,
        createPsychologistDto
      );

      await applicationValidateOrReject(createPsychologistDtoInstance);

      await this.createPsychologistService.execute(createPsychologistDto);
    } catch (e) {
      throw new GlobalAppHttpException(e);
    }
  }
}
