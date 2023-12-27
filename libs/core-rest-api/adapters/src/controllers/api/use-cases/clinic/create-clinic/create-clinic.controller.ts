// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NestjsCreateClinicService } from './nestjs-create-clinic.service';

interface CreateClinicResponse {
  message: string;
}

@ApiTags('Clinic')
@Controller({
  path: 'clinic',
})
export class CreateClinicController {
  constructor(private createClinicService: NestjsCreateClinicService) {}

  @Post('create')
  async execute(@Body() createClinicDto: CreateClinicDto): Promise<CreateClinicResponse> {
    try {
      await this.createClinicService.execute(createClinicDto);
      return { message: 'Clinic created successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
