import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../shared/errors/globalAppHttpException';
import { CreateClinicControllerBodyInputDto } from './input.dto';
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
    @Body() createClinicDto: CreateClinicControllerBodyInputDto,
  ): Promise<CreateClinicControllerOutputDto> {
    try {
      const clinic = await this.createClinicService.execute(createClinicDto);
      return clinic;
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
