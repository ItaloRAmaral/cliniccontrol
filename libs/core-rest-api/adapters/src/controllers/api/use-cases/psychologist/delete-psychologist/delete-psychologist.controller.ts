import { Controller, Delete, ForbiddenException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { patchMethodDocs } from './docs';

import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';

import { TokenPayload } from '../../../../../auth/jwt.strategy';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { emailParam, routeParamSchema } from './dto';
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
    @Param('psychologistEmail') psychologistEmail: emailParam,
    @CurrentUser() currentUser: TokenPayload
  ) {
    try {
      console.log('psychologist ID', psychologistEmail);
      console.log('psychologist ID', typeof psychologistEmail);
      routeParamSchema.parse(psychologistEmail);

      if (psychologistEmail !== currentUser.email) {
        throw new ForbiddenException('You can only delete your own account');
      }

      console.log('psychologist ID', currentUser);
      // this.deletePsychologistService.execute(psychologistEmail);
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
