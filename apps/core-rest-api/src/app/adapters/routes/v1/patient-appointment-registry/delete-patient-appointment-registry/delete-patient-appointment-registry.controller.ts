import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../shared/errors/globalAppHttpException';
import { DeletePatientAppointmentRegistryParamsInputDto } from './input.dto';
import { NestjsDeletePatientAppointmentRegistryService } from './nestjs-delete-patient-appointment-registry.service';
import { DeletePatientAppointmentRegistryControllerOutputDto } from './output.dto';

@ApiTags('Delete Patient Appointment Registry')
@Controller({
  path: 'appointment-registry',
})
export class DeletePatientAppointmentRegistryController {
  constructor(
    private deletePatientAppointmentRegistryService: NestjsDeletePatientAppointmentRegistryService,
  ) {}

  @Delete(':id/delete')
  async execute(
    @Param()
    { id }: DeletePatientAppointmentRegistryParamsInputDto,
  ): Promise<DeletePatientAppointmentRegistryControllerOutputDto> {
    try {
      await this.deletePatientAppointmentRegistryService.execute({ id });

      return { message: 'Appointment registry deleted successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
