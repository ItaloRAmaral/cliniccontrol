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
      const serviceResponse = await this.deleteClinicService.execute(clinicId);

      const deletedClinicResponseInfo = {
        clinic: {
          name: serviceResponse.deletedClinic.name,
        },
        deletedAt: new Date(),
      };

      return {
        message: 'Clinic deleted successfully',
        data: deletedClinicResponseInfo,
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
