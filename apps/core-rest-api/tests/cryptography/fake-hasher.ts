/*
  Importante retornar no método hash algo diferente do plain (password), pois o hash é usado para comparar.
  E vale lembrar que na implementação real a senha do usuário é salva criptografada no banco de dados.
  Esta classe é um mock para ser usada exclusivamente nos testes.
*/

import { HashComparer } from '../../src/app/core/shared/cryptography/repository/hash-comparer-repository';
import { HashGenerator } from '../../src/app/core/shared/cryptography/repository/hash-generator-repository';

export class FakeHasher implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed');
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash;
  }
}
