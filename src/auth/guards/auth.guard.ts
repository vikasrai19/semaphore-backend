import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type TokenData = { sub: string; username: string, userTypeId: string, userType: string };

@Injectable()
export class SuperUserAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (authorization === null || authorization === undefined) {
      throw new UnauthorizedException();
    }
    const tokenData = authorization.split(' ');
    if (tokenData[0] != 'Bearer') {
      throw new UnauthorizedException();
    }
    const token: string = tokenData[1];
    if (await this.jwtService.verifyAsync(token)) {
      const jwtTokenData: TokenData = await this.jwtService.decode(token);
      return jwtTokenData.userType.toLowerCase() == 'super user';
    }
    throw new BadRequestException('Cannot verify the user');
  }
}
