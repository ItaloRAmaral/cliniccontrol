import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateClinicDto } from '../../../../../../core/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { NestjsCreateClinicService } from './nestjs-create-clinic.service';

interface createClinicResponse {
  message: string
}
@ApiTags('Clinic')
@Controller({
  path: 'clinic',
})
export class CreateClinicController {
  constructor(
    private createClinicService: NestjsCreateClinicService
  ) {}

  @Post('create')
  async execute(
    @Body() createClinicDto: CreateClinicDto
  ): Promise<createClinicResponse>{
    try {
      await this.createClinicService.execute(createClinicDto);
      return {message: 'Clinic created successfully'}
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
