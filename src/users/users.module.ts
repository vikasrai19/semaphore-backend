import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsertypeModule } from '../usertype/usertype.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptUtil } from '../utils/bcrypt.util';

@Module({
  providers: [UsersService, BcryptUtil],
  exports: [UsersService],
  imports: [UsertypeModule, TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
