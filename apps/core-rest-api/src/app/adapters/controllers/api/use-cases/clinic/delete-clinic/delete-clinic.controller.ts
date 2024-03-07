import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { DeleteClinicControllerInputDto } from './input.dto';
import { NestjsDeleteClinicService } from './nestjs-delete-clinic.service';
import { DeleteClinicControllerOutputDto } from './output.dto';

@ApiTags('Clinic')
@Controller({
  path: 'clinic',
})
export class DeleteClinicController {
  constructor(private deleteClinicService: NestjsDeleteClinicService) {}

  @Delete(':clinicId/delete')
  async execute(
    @Param() { clinicId }: DeleteClinicControllerInputDto,
  ): Promise<DeleteClinicControllerOutputDto> {
    try {
      await this.deleteClinicService.execute(clinicId);

      return {
        message: 'Clinic deleted successfully',
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
