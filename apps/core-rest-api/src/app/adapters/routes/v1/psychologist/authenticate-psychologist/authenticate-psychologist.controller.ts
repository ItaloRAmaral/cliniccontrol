import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Encrypter } from '../../../../../core/shared/cryptography/repository/encrypter-repository';
import { GlobalAppHttpException } from '../../../../../shared/errors/globalAppHttpException';

import { Public } from '../../../../auth/public';
import { ControllerBodyInputDto } from './input.dto';
import { NestjsAuthenticatePsychologistService } from './nestjs-authenticate-psychologist.service';
import { AuthenticatePsychologistControllerOutputDto } from './output.dto';

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
    @Body() psychologistLoginDto: ControllerBodyInputDto,
  ): Promise<AuthenticatePsychologistControllerOutputDto> {
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
