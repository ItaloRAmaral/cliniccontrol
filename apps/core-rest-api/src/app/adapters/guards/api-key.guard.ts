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
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    console.log('API Key Validation...')
    const request = context.switchToHttp().getRequest<Request>()

    const apiKeyHeader = request.header('api-key')

    if (!apiKeyHeader) {
      console.log('API key is missing...')
      throw new UnauthorizedException('API key is missing')
    }

    if( apiKeyHeader !== process.env['API_KEY'] ) {
      console.log('Invalid API key......')
      throw new UnauthorizedException('Invalid API key...')
    }

    return true
  }
}
