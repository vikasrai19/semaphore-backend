import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { email: string; password: string };
type SignInData = { userId: string; username: string; userTypeId: string, userType: string };
type AuthResult = { accessToken: string; userId: string; username: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly bcrypt: BcryptUtil,
    private jwtService: JwtService,
  ) {}
  async authenticateUser(input: AuthInput): Promise<AuthResult | null> {
    const user: SignInData = await this.validateUser(input);
    return {
      userId: user.userId,
      username: user.username,
      accessToken: await this.generateToken(
        user.userId,
        user.username,
        user.userTypeId,
        user.userType,
      ),
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user: User = await this.userService.findUserByEmail(input.email);
    if (user == null) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = await this.bcrypt.matchPassword(
      input.password,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Please check your credentials');
    }
    return {
      username: user.username,
      userId: user.userId,
      userTypeId: user.userType.userTypeId,
      userType: user.userType.userType,
    };
  }

  private async generateToken(
    userId: string,
    username: string,
    userTypeId: string,
    userType: string,
  ): Promise<string> {
    const tokenPayload = {
      sub: userId,
      username: username,
      userTypeId: userTypeId,
      userType: userType,
    };
    return await this.jwtService.signAsync(tokenPayload);
  }
}
