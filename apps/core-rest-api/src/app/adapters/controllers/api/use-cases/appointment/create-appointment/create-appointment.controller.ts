import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { CreateSingleAppointmentInputDto } from "./dto";
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
  async execute(@Body() createAppointmentDto: CreateSingleAppointmentInputDto): Promise<CreateAppointmentResponse>{
    try {
      await this.createAppointmentService.execute({...createAppointmentDto, date: new Date(createAppointmentDto.date)});

      return {
        message: 'Appointment created successfully',
      }
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }
}
