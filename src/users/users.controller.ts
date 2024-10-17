import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SuperUserAuthGuard } from '../auth/guards/auth.guard';

@Controller('/web/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/CreateUser')
  async createUser(@Body() createUserRequest: CreateUserDto) {
    return await this.usersService.createUser(createUserRequest);
  }
}
