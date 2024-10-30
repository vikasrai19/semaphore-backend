import { UsersService } from './users.service';
import { UsertypeModule } from '../usertype/usertype.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [UsersService, BcryptUtil, JwtService, EmailService],
  exports: [UsersService],
  imports: [UsertypeModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
})
export class UsersModule {}
