import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Registry } from '../../../../../../core/domains/patient-appointment-registry/entities/registry/dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { UpdatePatientAppointmentRegistryParamsInputDto } from './input.dto';
import { NestjsUpdatePatientAppointmentRegistryService } from './nestjs-update-patient-appointment-registry.service';
import { UpdatePatientAppointmentRegistryControllerOutputDto } from './output.dto';

@ApiTags('Update Patient Appointment Registry')
@Controller({
  path: 'appointment-registry',
})
export class UpdatePatientAppointmentRegistryController {
  constructor(
    private updatePatientAppointmentRegistryService: NestjsUpdatePatientAppointmentRegistryService,
  ) {}

  @Patch(':id/update')
  async execute(
    @Param()
    { id }: UpdatePatientAppointmentRegistryParamsInputDto,
    @Body()
    registry: Registry,
  ): Promise<UpdatePatientAppointmentRegistryControllerOutputDto> {
    try {
      await this.updatePatientAppointmentRegistryService.execute({ id, registry });

      return { message: 'Appointment registry updated successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
