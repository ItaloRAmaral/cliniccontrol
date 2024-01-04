import { BadRequestException, Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { patchMethodDocs } from './docs';

import { UpdatePsychologistDto } from '../../../../../../core/domains/psychologist/use-cases/update-psychologist/update-psychologist-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { UpdatePsychologistControllerDto } from './dto';
import { NestjsUpdatePsychologistService } from './nestjs-update-psychologist.service';

@ApiTags('Psychologist')
@ApiBearerAuth()
@Controller({
  path: 'psychologist',
})
export class UpdatePsychologistController {
  constructor(private updatePsychologistService: NestjsUpdatePsychologistService) {}

  @Patch(':psychologistId/update')
  @ApiOperation(patchMethodDocs)
  async execute(
    @Param('psychologistId') psychologistId: string,
    @Body() updatePsychologistDto: UpdatePsychologistControllerDto
  ) {
    try {
      const isReqBodyEmpty = Object.keys(updatePsychologistDto).length === 0;

      if (isReqBodyEmpty) {
        throw new BadRequestException('Must provide at least one field to update');
      }

      const psychologist = {
        id: psychologistId.toString(),
        ...updatePsychologistDto,
      } as UpdatePsychologistDto;

      await this.updatePsychologistService.execute(psychologist);

      return { message: 'Psychologist updated successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
