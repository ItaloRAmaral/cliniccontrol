import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { postMethodDocs } from './docs';

import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';

import { CreatePatientDto } from '../../../../../../core/domains/patient/use-cases/create-patient/create-patient-dto';
import { NestjsCreatePatientService } from './nestjs-create-patient.service';

@ApiTags('patient')
@ApiBearerAuth()
@Controller({
  path: 'patient',
})
export class CreatePatientController {
  constructor(private createPatientService: NestjsCreatePatientService) {}

  @Post('create')
  @ApiOperation(postMethodDocs)
  async execute(@Body() createPatientDto: CreatePatientDto) {
    try {
      await this.createPatientService.execute(createPatientDto);

      return {
        message: 'Patient created successfully',
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
