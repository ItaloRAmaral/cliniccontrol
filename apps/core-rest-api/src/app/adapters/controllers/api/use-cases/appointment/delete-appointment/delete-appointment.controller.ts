import { Controller, Delete, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { DeleteAppointmentInputDto } from "./input.dto";
import { NestjsDeleteAppointmentService } from "./nestjs-delete-appointment.service";
import { DeleteAppointmentOutputDto } from "./output.dto";

@ApiTags('Appointment')
@ApiBearerAuth()
@Controller({
  path: 'appointment',
})
export class DeleteAppointmentController {
  constructor(private deleteAppointmentService: NestjsDeleteAppointmentService) {}

  @Delete(':appointmentId/delete')
  async execute(@Param() {appointmentId}: DeleteAppointmentInputDto): Promise<DeleteAppointmentOutputDto>{
    try {
      await this.deleteAppointmentService.execute(appointmentId);
      return {
        message: 'Appointment deleted successfully',
      }
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }
}
