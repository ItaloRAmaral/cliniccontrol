import { compare, hash } from 'bcryptjs';
import { HashComparer } from '../repository/hash-comparer-repository';
import { HashGenerator } from '../repository/hash-generator-repository';

export class BcryptHasherService implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
