import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { CreatePsychologistInputDto } from '../../../../../../core/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { applicationValidateOrReject } from '../../../../../../shared/validators/validate-or-reject';
import { Public } from '../../../../../auth/public';
import { ApiKeyGuard } from '../../../guards/api-key.guard';
import { NestjsCreatePsychologistService } from './nestjs-create-psychologist.service';

/**
 * ExecutionContext
 * @see https://docs.nestjs.com/fundamentals/execution-context#low-level-approach
 */

@ApiTags()
@Controller({
  path: 'psychologist',
})
export class CreatePsychologistController {
  constructor(private createPsychologistService: NestjsCreatePsychologistService) {}

  @Post('create')
  @UseGuards(ApiKeyGuard)
  @Public()
  async execute(
    @Body() createPsychologistDto: CreatePsychologistInputDto,
  ): Promise<null | undefined | void> {
    try {
      const createPsychologistDtoInstance = plainToInstance(
        CreatePsychologistInputDto,
        createPsychologistDto,
      );

      await applicationValidateOrReject(createPsychologistDtoInstance);

      await this.createPsychologistService.execute(createPsychologistDto);
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
