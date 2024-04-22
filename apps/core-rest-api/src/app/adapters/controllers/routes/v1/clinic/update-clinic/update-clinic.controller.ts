import { BadRequestException, Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UpdateClinicInputDto } from '../../../../../../core/domains/clinic/use-cases/update-clinic/update-clinic-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import {
  UpdateClinicControllerBodyInputDto,
  UpdateClinicControllerParamsInputDto,
} from './input.dto';
import { NestjsUpdateClinicService } from './nestjs-update-clinic.service';
import { UpdateClinicControllerOutputDto } from './output.dto';

@ApiTags('Clinic')
@ApiBearerAuth()
@Controller({
  path: 'clinic',
})
export class UpdateClinicController {
  constructor(private updateClinicService: NestjsUpdateClinicService) {}

  @Patch(':id/update')
  async execute(
    @Param() { id }: UpdateClinicControllerParamsInputDto,
    @Body() updateClinicDto: UpdateClinicControllerBodyInputDto,
  ): Promise<UpdateClinicControllerOutputDto> {
    try {
      const isReqBodyEmpty = Object.keys(updateClinicDto).length === 0;

      if (isReqBodyEmpty) {
        throw new BadRequestException('Must provide at least one field to update');
      }

      const clinic = {
        id: id.toString(),
        ...updateClinicDto,
      } as UpdateClinicInputDto;

      const updatedClinic = await this.updateClinicService.execute(clinic);

      return { message: 'Clinic updated successfully', updatedClinic };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
