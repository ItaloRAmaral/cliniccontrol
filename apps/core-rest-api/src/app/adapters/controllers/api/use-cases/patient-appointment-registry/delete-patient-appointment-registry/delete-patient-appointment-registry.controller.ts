import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import {
  DeletePatientAppointmentRegistryInputDto,
  DeletePatientAppointmentRegistryOutputDto,
} from './dto';
import { NestjsDeletePatientAppointmentRegistryService } from './nestjs-delete-patient-appointment-registry.service';

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
    { id }: DeletePatientAppointmentRegistryInputDto,
  ): Promise<DeletePatientAppointmentRegistryOutputDto> {
    try {
      await this.deletePatientAppointmentRegistryService.execute({ id });

      return { message: 'Appointment registry deleted successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
