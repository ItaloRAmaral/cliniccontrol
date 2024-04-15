import { Controller, Delete, ForbiddenException, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { patchMethodDocs } from './docs';

import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';

import { TokenPayload } from '../../../../../auth/jwt.strategy';
import { CurrentUser } from '../../../decorators/current-user.decorator';
import { DeletePsychologistParamsInputDto } from './input.dto';
import { NestjsDeletePsychologistService } from './nestjs-delete-psychologist.service';
import { DeletePsychologistControllerOutputDto } from './output.dto';

@ApiTags('Psychologist')
@ApiBearerAuth()
@Controller({
  path: 'psychologist',
})
export class DeletePsychologistController {
  constructor(private deletePsychologistService: NestjsDeletePsychologistService) {}

  @Delete(':email/delete')
  @ApiOperation(patchMethodDocs)
  async execute(
    @Param() { email }: DeletePsychologistParamsInputDto,
    @CurrentUser() currentUser: TokenPayload,
  ): Promise<DeletePsychologistControllerOutputDto> {
    try {
      if (email !== currentUser.email) {
        throw new ForbiddenException('You can only delete your own account');
      }

      await this.deletePsychologistService.execute(email);

      return {
        message: 'Psychologist deleted successfully',
      };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
