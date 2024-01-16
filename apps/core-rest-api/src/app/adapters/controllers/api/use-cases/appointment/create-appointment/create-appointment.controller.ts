import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateSingleAppointmentDto } from '../../../../../../core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { postMethodDocs } from "../../patient/create-patient/docs";
import { NestjsCreateAppointmentService } from "./nestjs-create-appointment.services";

@ApiTags('appointment')
@ApiBearerAuth()
@Controller({
  path: 'appointment',
})
export class CreateAppointmentController {
  constructor(private createAppointmentService: NestjsCreateAppointmentService) {}

  @Post('create')
  @ApiOperation(postMethodDocs)
  async execute(@Body() createAppointmentDto: CreateSingleAppointmentDto) {
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
