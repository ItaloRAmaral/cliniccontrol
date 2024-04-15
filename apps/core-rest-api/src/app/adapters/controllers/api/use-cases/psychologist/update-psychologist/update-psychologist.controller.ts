import { BadRequestException, Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { patchMethodDocs } from './docs';

import { UpdatePsychologistInputDto } from '../../../../../../core/domains/psychologist/use-cases/update-psychologist/update-psychologist-dto';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import {
  DeletePatientAppointmentRegistryParamsInputDto,
  UpdatePsychologistControllerBodyInputDto,
} from './input.dto';
import { NestjsUpdatePsychologistService } from './nestjs-update-psychologist.service';
import { UpdatePsychologistControllerOutputDto } from './output.dto';

@ApiTags('Psychologist')
@ApiBearerAuth()
@Controller({
  path: 'psychologist',
})
export class UpdatePsychologistController {
  constructor(private updatePsychologistService: NestjsUpdatePsychologistService) {}

  @Patch(':id/update')
  @ApiOperation(patchMethodDocs)
  async execute(
    @Param() { id }: DeletePatientAppointmentRegistryParamsInputDto,
    @Body() updatePsychologistDto: UpdatePsychologistControllerBodyInputDto,
  ): Promise<UpdatePsychologistControllerOutputDto> {
    try {
      const isReqBodyEmpty = Object.keys(updatePsychologistDto).length === 0;

      if (isReqBodyEmpty) {
        throw new BadRequestException('Must provide at least one field to update');
      }

      const psychologist = {
        id: id.toString(),
        ...updatePsychologistDto,
        price: updatePsychologistDto.price ?? null,
      } as UpdatePsychologistInputDto;

      const updatedPsychologist =
        await this.updatePsychologistService.execute(psychologist);

      return { message: 'Psychologist updated successfully', updatedPsychologist };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
