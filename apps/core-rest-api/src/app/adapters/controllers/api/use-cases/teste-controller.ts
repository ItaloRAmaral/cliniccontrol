import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../auth/public';

import { GlobalAppHttpException } from '../../../../shared/errors/globalAppHttpException';
import { PostgresTypeOrmRepository } from '../../../database/repositories/psychologist/teste';

@ApiTags('teste')
@ApiBearerAuth()
@Controller({
  path: 'teste',
})
export class TestetController {
  constructor(private postgresTypeOrmRepository: PostgresTypeOrmRepository) {}

  @Get()
  @Public()
  async execute() {
    try {
      const teste = await this.postgresTypeOrmRepository.getDataSource();
      return teste;
    } catch (error: unknown) {
      console.log(error);
      throw new GlobalAppHttpException(error);
    }
  }
}
