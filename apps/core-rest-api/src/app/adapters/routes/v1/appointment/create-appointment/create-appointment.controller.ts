import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../shared/errors/globalAppHttpException';
import { CreateSingleAppointmentControllerBodyInputDto } from './input.dto';
import { NestjsCreateAppointmentService } from './nestjs-create-appointment.service';
import { CreateAppointmentControllerOutputDto } from './output.dto';

@ApiTags('Appointment')
@ApiBearerAuth()
@Controller({
  path: 'appointment',
})
export class CreateAppointmentController {
  constructor(private createAppointmentService: NestjsCreateAppointmentService) {}

  @Post('create')
  // @ApiOperation(postMethodDocs)
  async execute(
    @Body() createAppointmentDto: CreateSingleAppointmentControllerBodyInputDto,
  ): Promise<CreateAppointmentControllerOutputDto> {
    try {
      const appointment = await this.createAppointmentService.execute({
        ...createAppointmentDto,
        date: new Date(createAppointmentDto.date),
      });

      return appointment;
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }
}
