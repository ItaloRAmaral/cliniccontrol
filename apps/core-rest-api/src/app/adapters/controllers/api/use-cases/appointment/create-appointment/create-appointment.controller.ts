import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { CreateSingleAppointmentControllerInputDto } from './input.dto';
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
    @Body() createAppointmentDto: CreateSingleAppointmentControllerInputDto,
  ): Promise<CreateAppointmentControllerOutputDto> {
    try {
      await this.createAppointmentService.execute({
        ...createAppointmentDto,
        date: new Date(createAppointmentDto.date),
      });

      return {
        message: 'Appointment created successfully',
      };
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }
}
