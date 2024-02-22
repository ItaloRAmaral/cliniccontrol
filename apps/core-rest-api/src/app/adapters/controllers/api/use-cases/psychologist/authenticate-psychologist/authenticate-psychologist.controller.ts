import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticatePsychologistInputDto } from '../../../../../../core/domains/psychologist/use-cases/authenticate-psychologist/authenticate-psychologist-dto';
import { Encrypter } from '../../../../../../core/shared/cryptography/repository/encrypter-repository';
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';

import { Public } from '../../../../../auth/public';
import { AuthenticatePsychologistControllerResponse } from './authenticate-psychologist.interface';
import { NestjsAuthenticatePsychologistService } from './nestjs-authenticate-psychologist.service';

@ApiTags()
@Controller({
  path: 'psychologist',
})
export class AuthenticatePsychologistController {
  constructor(
    private AuthenticatePsychologistService: NestjsAuthenticatePsychologistService,
    private jwtEncrypter: Encrypter,
  ) {}

  @Post('login')
  @Public()
  async execute(
    @Body() psychologistLoginDto: AuthenticatePsychologistInputDto,
  ): Promise<AuthenticatePsychologistControllerResponse> {
    try {
      const { id, name, email } =
        await this.AuthenticatePsychologistService.execute(psychologistLoginDto);

      const access_token = await this.jwtEncrypter.encrypt({ id, name, email });

      return { user: { id, name, email }, access_token };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
