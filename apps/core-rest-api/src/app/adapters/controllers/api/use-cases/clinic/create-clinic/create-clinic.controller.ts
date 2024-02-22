import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { CreateClinicControllerInputDto } from './input.dto';
import { NestjsCreateClinicService } from './nestjs-create-clinic.service';
import { CreateClinicControllerOutputDto } from './output.dto';

@ApiTags('Clinic')
@Controller({
  path: 'clinic',
})
export class CreateClinicController {
  constructor(private createClinicService: NestjsCreateClinicService) {}

  @Post('create')
  async execute(
    @Body() createClinicDto: CreateClinicControllerInputDto,
  ): Promise<CreateClinicControllerOutputDto> {
    try {
      await this.createClinicService.execute(createClinicDto);
      return { message: 'Clinic created successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
