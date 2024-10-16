import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { UserType } from '../../usertype/usertype.entity';

type TokenData = { sub: string; username: string };

@Injectable()
export class SuperUserAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const tokenData = authorization.split(' ');
    if (tokenData[0] != 'Bearer') {
      throw new UnauthorizedException();
    }
    const token: string = tokenData[1];
    const jwtTokenData: TokenData = await this.jwtService.decode(token);
    const userType: UserType = await this.userService.getUserTypeFromId(
      jwtTokenData.sub,
    );
    return userType.userType.toLowerCase() == 'super user';
  }
}
