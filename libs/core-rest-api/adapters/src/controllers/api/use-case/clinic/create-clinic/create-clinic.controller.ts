// eslint-disable-next-line @nx/enforce-module-boundaries
import { CreateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/src/shared/validators/validate-or-reject';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiKeyGuard } from '../../../guards/api-key.guard';
import { NestjsCreateClinicService } from './nestjs-create-clinic.service';

@ApiTags()
@Controller({
  path: 'clinic',
})
export class CreateClinicController {
  constructor(
    private createClinicService: NestjsCreateClinicService
  ) {}

  @Post('create')
  @UseGuards(ApiKeyGuard)
  async execute(
    @Body() createClinicDto: CreateClinicDto
  ): Promise<null | undefined | void> {
    try {
      const createClinicDtoInstance = plainToInstance(
        CreateClinicDto,
        createClinicDto
      );

      await applicationValidateOrReject(createClinicDtoInstance);

      await this.createClinicService.execute(createClinicDto);
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
