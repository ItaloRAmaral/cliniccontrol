/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  override canActivate(context: ExecutionContext) {
    console.log('[JWT-GUARD] - Verifying if route is public');

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isPublic) {
      return super.canActivate(context);
    }

    return true;
  }

  override handleRequest(err: unknown, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid JWT token');
    }

    return user;
  }
}
