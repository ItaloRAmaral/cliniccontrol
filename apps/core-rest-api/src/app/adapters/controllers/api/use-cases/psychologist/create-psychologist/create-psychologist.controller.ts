import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { applicationValidateOrReject } from '../../../../../../shared/validators/validate-or-reject';
import { Public } from '../../../../../auth/public';
import { ApiKeyGuard } from '../../../guards/api-key.guard';
import { CreatePsychologistControllerBodyInputDto } from './input.dto';
import { NestjsCreatePsychologistService } from './nestjs-create-psychologist.service';
import { CreatePsychologistControllerOutputDto } from './output.dto';

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
    @Body() createPsychologistDto: CreatePsychologistControllerBodyInputDto,
  ): Promise<CreatePsychologistControllerOutputDto> {
    try {
      const createPsychologistDtoInstance = plainToInstance(
        CreatePsychologistControllerBodyInputDto,
        createPsychologistDto,
      );

      await applicationValidateOrReject(createPsychologistDtoInstance);

      const psychologist =
        await this.createPsychologistService.execute(createPsychologistDto);

      return psychologist;
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
