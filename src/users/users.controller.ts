import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuperUserAuthGuard } from '../auth/guards/auth.guard';
import { EmailService } from 'src/email/email.service';

@Controller('/web/api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/CreateUser')
  async createUser(@Body() createUserRequest: CreateUserDto) {
    return await this.usersService.createUser(createUserRequest);
  }

  @UseGuards(SuperUserAuthGuard)
  @Get('/v1/GetUserList')
  async GetUserList() {
    return await this.usersService.getUserList();
  }

  @Get('/v1/test-email')
  async testEmail() {
    return await this.emailService.sendEmailVerificationMail(
      'nnm23mc174@nmamit.in',
      'Vikas Rai',
      'vikasrai19',
    );
  }

  @Get('/v1/VerifyEmailUser')
  async verifyEmailUser(@Param('userId') userId: string): Promise<string> {
    return await this.usersService.verifyUserEmail(userId);
  }
}
