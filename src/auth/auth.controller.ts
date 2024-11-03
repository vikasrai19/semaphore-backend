import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

type LoginRequest = { email: string; password: string };

@Controller('web/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/v1/Login')
  async loginUser(@Body() loginRequest: LoginRequest) {
    return await this.authService.authenticateUser(loginRequest);
  }

  @Get('/v1/IsAuthenticated')
  async isAuthenticated(@Query('token') token: string) {
    return await this.authService.isUserAuthenticated(token);
  }
}
