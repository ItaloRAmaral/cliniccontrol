import { Public } from '@clinicControl/core-rest-api/adapters/src/auth/public';
import { AuthenticatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/authenticate-psychologist/authenticate-psychologist-dto';
import { Encrypter } from '@clinicControl/core-rest-api/core/src/shared/cryptography/repository/encrypter-repository';
import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NestjsAuthenticatePsychologistService } from './nestjs-authenticate-psychologist.service';

@ApiTags()
@Controller({
  path: 'psychologist',
})
export class AuthenticatePsychologistController {
  constructor(
    private AuthenticatePsychologistService: NestjsAuthenticatePsychologistService,
    private jwtEncrypter: Encrypter
  ) {}

  @Post('login')
  @Public()
  async execute(
    @Body() psychologistLoginDto: AuthenticatePsychologistDto
  ): Promise<unknown> {
    try {
      const { id, name, email } = await this.AuthenticatePsychologistService.execute(
        psychologistLoginDto
      );

      const access_token = await this.jwtEncrypter.encrypt({ id, name, email });

      return { id, name, email, access_token };
    } catch (error: unknown) {
      throw new GlobalAppHttpException(error);
    }
  }
}
