import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('API Key validation...');
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.header('api-key');

    if (!apiKeyHeader) {
      console.log('API Key is missing...');
      throw new UnauthorizedException('API Key is missing');
    }

    if (!apiKeyHeader || apiKeyHeader !== process.env['API_KEY']) {
      console.log('Invalid API Key...');
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
