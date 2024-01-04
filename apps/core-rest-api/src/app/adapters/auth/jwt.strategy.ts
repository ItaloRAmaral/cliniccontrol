import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';
import { EnvService } from '../env/env.service';

const tokenPayloadSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: EnvService) {
    const publicKey = config.get('JWT_PUBLIC_KEY');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: TokenPayload) {
    console.log('jwtStrategy validate');

    return tokenPayloadSchema.parse(payload);
  }
}
