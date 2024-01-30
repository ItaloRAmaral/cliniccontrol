import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateSingleAppointmentDto } from '../../../../../../core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { NestjsCreateAppointmentService } from "./nestjs-create-appointment.service";

interface CreateAppointmentResponse {
  message: string;
}
@ApiTags('Appointment')
@ApiBearerAuth()
@Controller({
  path: 'appointment',
})
export class CreateAppointmentController {
  constructor(private createAppointmentService: NestjsCreateAppointmentService) {}

  @Post('create')
  // @ApiOperation(postMethodDocs)
  async execute(@Body() createAppointmentDto: CreateSingleAppointmentDto): Promise<CreateAppointmentResponse>{
    try {
      await this.createAppointmentService.execute(createAppointmentDto);

      return {
        message: 'Appointment created successfully',
      }
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }
}
