import { Module } from '@nestjs/common';

import { Encrypter } from '../../core/shared/cryptography/repository/encrypter-repository';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [{ provide: Encrypter, useClass: JwtEncrypter }],
  exports: [Encrypter],
})
export class CryptographyModule {}
