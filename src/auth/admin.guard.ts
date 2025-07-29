import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('AdminGuard');
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user', user);
    if (user.role !== 'admin') {
      throw new UnauthorizedException(
        'You are not authorized to access this resource',
      );
    }
    return true;
  }
}
