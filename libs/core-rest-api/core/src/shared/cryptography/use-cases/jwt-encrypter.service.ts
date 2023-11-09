import { JwtService } from '@nestjs/jwt';
import { Encrypter } from '../encrypter';

export class JwtEncrypterService implements Encrypter {
  constructor(private jwtService: JwtService) {}

  encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.jwtService.signAsync(payload);
  }
}
