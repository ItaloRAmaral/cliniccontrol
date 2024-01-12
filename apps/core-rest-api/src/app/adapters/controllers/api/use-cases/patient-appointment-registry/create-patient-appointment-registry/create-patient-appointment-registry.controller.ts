import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePatientAppointmentRegistryDto } from '../../../../../../core/domains/patient-appointment-registry/use-cases/create-appointment-registry/create-appointment-registry-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { CreatePatientAppointmentRegistryOutputDto } from './dto';
import { NestjsCreatePatientAppointmentRegistryService } from './nestjs-create-patient-appointment-registry.service';

@ApiTags('Create Patient Appointment Registry')
@Controller({
  path: 'appointment-registry',
})
export class CreatePatientAppointmentRegistryController {
  constructor(private createPatientAppointmentRegistryService: NestjsCreatePatientAppointmentRegistryService) {}

  @Post('create')
  async execute(@Body() createPatientAppointmentRegistryDto: CreatePatientAppointmentRegistryDto): Promise<CreatePatientAppointmentRegistryOutputDto> {
    try {
      await this.createPatientAppointmentRegistryService.execute(createPatientAppointmentRegistryDto);
      return { message: 'Appointment registry created successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
