import { Module } from '@nestjs/common';

import { Encrypter } from '@clinicControl/core-rest-api/core/src/shared/cryptography/encrypter';
import { HashComparer } from '@clinicControl/core-rest-api/core/src/shared/cryptography/hash-comparer';
import { HashGenerator } from '@clinicControl/core-rest-api/core/src/shared/cryptography/hash-generator';
import { BcryptHasher } from './bcrypt-hasher';
import { JwtEncrypter } from './jwt-encrypter';

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
