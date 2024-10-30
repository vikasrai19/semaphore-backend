import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
    return await this.emailService.sendEmail(
      'nnm23mc174@nmamit.in',
      'Test Email',
      'This is a test email',
    );
  }
}
