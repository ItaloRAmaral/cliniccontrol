import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../shared/errors/globalAppHttpException';
import { DeleteAppointmentControllerParamsInputDto } from './input.dto';
import { NestjsDeleteAppointmentService } from './nestjs-delete-appointment.service';
import { DeleteAppointmentOutputDto } from './output.dto';

@ApiTags('Appointment')
@ApiBearerAuth()
@Controller({
  path: 'appointment',
})
export class DeleteAppointmentController {
  constructor(private deleteAppointmentService: NestjsDeleteAppointmentService) {}

  @Delete(':id/delete')
  async execute(
    @Param() { id }: DeleteAppointmentControllerParamsInputDto,
  ): Promise<DeleteAppointmentOutputDto> {
    try {
      await this.deleteAppointmentService.execute(id);
      return {
        message: 'Appointment deleted successfully',
      };
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }
}
