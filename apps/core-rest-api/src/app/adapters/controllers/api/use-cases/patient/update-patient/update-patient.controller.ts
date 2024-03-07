import { BadRequestException, Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { patchMethodDocs } from './docs';

import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import {
  UpdatePatientControllerReqBodyInputDto,
  UpdatePatientControllerReqParamsInputDto,
} from './input-dto';
import { NestjsUpdatePatientService } from './nestjs-update-patient.service';

@ApiTags('Patient')
@ApiBearerAuth()
@Controller({
  path: 'patient',
})
export class UpdatePatientController {
  constructor(private updatePatientService: NestjsUpdatePatientService) {}

  @Patch(':id/update')
  @ApiOperation(patchMethodDocs)
  async execute(
    @Param() { id }: UpdatePatientControllerReqParamsInputDto,
    @Body() updatePsychologistDto: UpdatePatientControllerReqBodyInputDto,
  ) {
    try {
      const isReqBodyEmpty = Object.keys(updatePsychologistDto).length === 0;

      if (isReqBodyEmpty) {
        throw new BadRequestException('Must provide at least one field to update');
      }

      await this.updatePatientService.execute({ id, ...updatePsychologistDto });

      return { message: 'Patient updated successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
