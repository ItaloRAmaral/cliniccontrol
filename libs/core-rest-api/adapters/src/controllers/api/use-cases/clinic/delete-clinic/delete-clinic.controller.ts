// eslint-disable-next-line @nx/enforce-module-boundaries
import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';
import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IControllerResponse, RouteParamsDto } from './dto';
import { NestjsDeleteClinicService } from './nestjs-delete-clinic.service';

@ApiTags('Clinic')
@Controller({
  path: 'clinic',
})
export class DeleteClinicController {
  constructor(
    private deleteClinicService: NestjsDeleteClinicService
  ) {}

  @Delete(':clinicId/delete')
  async execute(
    @Param() { clinicName, psychologistId }: RouteParamsDto
  ): Promise<IControllerResponse>{
    try {
      const serviceResponse = await this.deleteClinicService.execute(clinicName, psychologistId);

      const deletedClinicResponseInfo = {
        clinic: {
          name: serviceResponse.deletedClinic.name,
        },
        deletedAt: new Date(),
      };

      return {
        message: 'Clinic deleted successfully',
        data:  deletedClinicResponseInfo
      }
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
