import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { deleteMethodDocs } from './docs';

import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';

import { TokenPayload } from '../../../../../auth/jwt.strategy';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { DeletePatientControllerInputDto } from './input.dto';
import { NestjsDeletePatientService } from './nestjs-delete-patient.service';
import { DeletePatientControllerOutputDto } from './output.dto';

@ApiTags('patient')
@ApiBearerAuth()
@Controller({
  path: 'patient',
})
export class DeletePatientController {
  constructor(private deletePatientService: NestjsDeletePatientService) {}

  @Delete(':patientId/delete')
  @ApiOperation(deleteMethodDocs)
  async execute(
    @Param() { patientId }: DeletePatientControllerInputDto,
    @CurrentUser() currentUser: TokenPayload,
  ): Promise<DeletePatientControllerOutputDto> {
    try {
      const deletePatientDto = {
        patientId,
        psychologistId: currentUser.id,
      };

      await this.deletePatientService.execute(deletePatientDto);

      return {
        message: 'Patient deleted successfully',
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
