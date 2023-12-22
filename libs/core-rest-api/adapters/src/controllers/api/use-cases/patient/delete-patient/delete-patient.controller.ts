import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { deleteMethodDocs } from './docs';

import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';

import { TokenPayload } from '../../../../../auth/jwt.strategy';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { RouteParamsDto } from './dto';
import { NestjsDeletePatientService } from './nestjs-delete-patient.service';

@ApiTags('patient')
@ApiBearerAuth()
@Controller({
  path: 'patient',
})
export class DeletePatientController {
  constructor(private deletePatientService: NestjsDeletePatientService) {}

  @Delete(':patientEmail/delete')
  @ApiOperation(deleteMethodDocs)
  async execute(
    @Param() { patientEmail }: RouteParamsDto,
    @CurrentUser() currentUser: TokenPayload,
  ) {
    try {
      await this.deletePatientService.execute(patientEmail);

      return {
        message: 'Patient deleted successfully',
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
