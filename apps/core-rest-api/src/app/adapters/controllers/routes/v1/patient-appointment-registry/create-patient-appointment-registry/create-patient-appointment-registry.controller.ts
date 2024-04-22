import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { CreatePatientAppointmentRegistryControllerBodyInputDto } from './input.dto';
import { NestjsCreatePatientAppointmentRegistryService } from './nestjs-create-patient-appointment-registry.service';
import { CreatePatientAppointmentRegistryControllerOutputDto } from './output.dto';

@ApiTags('Create Patient Appointment Registry')
@Controller({
  path: 'appointment-registry',
})
export class CreatePatientAppointmentRegistryController {
  constructor(
    private createPatientAppointmentRegistryService: NestjsCreatePatientAppointmentRegistryService,
  ) {}

  @Post('create')
  async execute(
    @Body()
    createPatientAppointmentRegistryDto: CreatePatientAppointmentRegistryControllerBodyInputDto,
  ): Promise<CreatePatientAppointmentRegistryControllerOutputDto> {
    try {
      const patientAppointmentRegistry =
        await this.createPatientAppointmentRegistryService.execute(
          createPatientAppointmentRegistryDto,
        );

      return patientAppointmentRegistry;
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
