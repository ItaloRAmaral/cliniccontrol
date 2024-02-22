import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { postMethodDocs } from './docs';

import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';

import { CreatePatientControllerInputDto } from './input.dto';
import { NestjsCreatePatientService } from './nestjs-create-patient.service';
import { CreatePatientControllerOutputDto } from './output.dto';

@ApiTags('patient')
@ApiBearerAuth()
@Controller({
  path: 'patient',
})
export class CreatePatientController {
  constructor(private createPatientService: NestjsCreatePatientService) {}

  @Post('create')
  @ApiOperation(postMethodDocs)
  async execute(
    @Body() createPatientDto: CreatePatientControllerInputDto,
  ): Promise<CreatePatientControllerOutputDto> {
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
