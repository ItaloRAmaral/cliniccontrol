import { Controller, Delete, ForbiddenException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { patchMethodDocs } from './docs';

import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';

import { TokenPayload } from '../../../../../auth/jwt.strategy';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { IControllerResponse, RouteParamsDto } from './dto';
import { NestjsDeletePsychologistService } from './nestjs-delete-psychologist.service';

@ApiTags('Psychologist')
@ApiBearerAuth()
@Controller({
  path: 'psychologist',
})
export class DeletePsychologistController {
  constructor(private deletePsychologistService: NestjsDeletePsychologistService) {}

  @Delete(':psychologistEmail/delete')
  @ApiOperation(patchMethodDocs)
  async execute(
    @Param() { psychologistEmail }: RouteParamsDto,
    @CurrentUser() currentUser: TokenPayload
  ): Promise<IControllerResponse> {
    try {
      if (psychologistEmail !== currentUser.email) {
        throw new ForbiddenException('You can only delete your own account');
      }

      const serviceResponse = await this.deletePsychologistService.execute(
        psychologistEmail
      );

      const deletedPsychologistResponseInfo = {
        user: {
          id: serviceResponse.deletedPsychologist.id,
          name: serviceResponse.deletedPsychologist.name,
          email: serviceResponse.deletedPsychologist.email,
          role: serviceResponse.deletedPsychologist.role,
        },
        associatedClinics: serviceResponse.associatedClinics,
        deletedAt: new Date(),
      };

      return {
        message: 'Psychologist deleted successfully',
        data: deletedPsychologistResponseInfo,
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
