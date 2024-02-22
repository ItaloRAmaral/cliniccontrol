import { BadRequestException, Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UpdateClinicInputDto } from '../../../../../../core/domains/clinic/use-cases/update-clinic/update-clinic-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { UpdateClinicControllerDto } from './dto';
import { NestjsUpdateClinicService } from './nestjs-update-clinic.service';

@ApiTags('Clinic')
@ApiBearerAuth()
@Controller({
  path: 'clinic',
})
export class UpdateClinicController {
  constructor(private updateClinicService: NestjsUpdateClinicService) {}

  @Patch(':clinicId/update')
  async execute(
    @Param('clinicId') clinicId: string,
    @Body() updateClinicDto: UpdateClinicControllerDto,
  ) {
    try {
      const isReqBodyEmpty = Object.keys(updateClinicDto).length === 0;

      if (isReqBodyEmpty) {
        throw new BadRequestException('Must provide at least one field to update');
      }

      const clinic = {
        id: clinicId.toString(),
        ...updateClinicDto,
      } as UpdateClinicInputDto;

      await this.updateClinicService.execute(clinic);

      return { message: 'Clinic updated successfully' };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
