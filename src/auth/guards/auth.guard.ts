import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type TokenData = {
  sub: string;
  username: string;
  userTypeId: string;
  userType: string;
};

@Injectable()
export class SuperUserAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
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
    if (
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })
    ) {
      const jwtTokenData: TokenData = await this.jwtService.decode(token);
      return jwtTokenData.userType.toLowerCase() == 'super user';
    }
    throw new BadRequestException('Cannot verify the user');
  }
}

@Injectable()
export class ParticipantAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
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
    if (
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })
    ) {
      const jwtTokenData: TokenData = await this.jwtService.decode(token);
      return jwtTokenData.userType.toLowerCase() == 'participant';
    }
    throw new BadRequestException('Cannot verify the user');
  }
}

@Injectable()
export class EventHeadAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
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
    if (
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })
    ) {
      const jwtTokenData: TokenData = await this.jwtService.decode(token);
      return jwtTokenData.userType.toLowerCase() == 'event head';
    }
    throw new BadRequestException('Cannot verify the user');
  }
}

@Injectable()
export class SuAndAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
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
    if (
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      })
    ) {
      const jwtTokenData: TokenData = await this.jwtService.decode(token);
      return (
        jwtTokenData.userType.toLowerCase() == 'super user' ||
        jwtTokenData.userType.toLowerCase() == 'admin'
      );
    }
    throw new BadRequestException('Cannot verify the user');
  }
}
