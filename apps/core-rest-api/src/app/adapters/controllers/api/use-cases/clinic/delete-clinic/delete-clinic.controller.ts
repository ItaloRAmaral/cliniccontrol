import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
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
    @Param() { clinicId }: RouteParamsDto
  ): Promise<IControllerResponse>{
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
        data:  deletedClinicResponseInfo
      }
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
