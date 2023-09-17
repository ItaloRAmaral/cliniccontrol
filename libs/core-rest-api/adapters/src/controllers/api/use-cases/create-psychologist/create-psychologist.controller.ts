import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { CreatePsychologistService } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist.service';
import { applicationValidateOrReject } from '@clinicControl/core-rest-api/core/src/shared/validators/validate-or-reject';
import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ApiKeyGuard } from '../../guards/api-key.guard';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { JwtAuthGuard } from '@clinicControl/core-rest-api/adapters/src/auth/jwt-auth.guard';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PostgreSqlPrismaOrmService } from '@clinicControl/core-rest-api/adapters/src/database/infra/prisma/prisma.service';
import { GlobalAppHttpException } from '@clinicControl/core-rest-api/core/src/shared/errors/globalAppHttpException';
import { JwtService } from '@nestjs/jwt';
import { postMethodDocs } from './docs';

@ApiTags('Core')
@Controller({
  path: 'psychologist',
  version: ['0'],
})
export class CreatePsychologistController {
  constructor(
    private createPsychologistService: CreatePsychologistService,
    private prisma: PostgreSqlPrismaOrmService,
    private jwt: JwtService
  ) {}

  @Post('create')
  @UseGuards(ApiKeyGuard)
  @ApiOperation(postMethodDocs)
  // @ApiBody({ type: CreatePsychologistDto })
  async execute(
    @Body() createPsychologistDto: CreatePsychologistDto
  ): Promise<PsychologistEntity | null | string | undefined> {
    try {
      console.log('Creating new User');
      const createPsychologistDtoInstance = plainToInstance(
        CreatePsychologistDto,
        createPsychologistDto
      );
      await applicationValidateOrReject(createPsychologistDtoInstance);

      const newPsychologist = await this.createPsychologistService.execute(
        createPsychologistDto
      );
      return newPsychologist as PsychologistEntity;
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }

  // testes
  @Post('login')
  async login(@Body() body: CreatePsychologistDto) {
    try {
      const createPsychologistDtoInstance = plainToInstance(
        CreatePsychologistDto,
        body
      );
      await applicationValidateOrReject(createPsychologistDtoInstance);
      const { email, password } = body;
      console.log('Logging in...');

      const psychologist = await this.prisma.psychologist.findUnique({
        where: {
          email,
        },
      });

      if (!psychologist) {
        console.log('User not found');
        throw new UnauthorizedException('User credentials do not match.');
      }

      const isPasswordValid = psychologist.password === password ? true : false;

      if (!isPasswordValid) {
        console.log('Password is invalid');
        throw new UnauthorizedException('User credentials do not match.');
      }

      const accessToken = this.jwt.sign({ sub: psychologist.id });

      return {
        access_token: accessToken,
      };
    } catch (error) {
      console.log('error', error);
      return 'error';
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me() {
    try {
      console.log('me');
      return 'psychologist';
    } catch (error) {
      console.log('An error occurred while GET  ME');
      console.log('error', error);
      return 'error';
    }
  }
}
