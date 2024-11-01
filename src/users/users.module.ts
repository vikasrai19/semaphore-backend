import { UsersService } from './users.service';
import { UsertypeModule } from '../usertype/usertype.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { JWT_SECRET } from 'src/configs/jwt-secret';

@Module({
  providers: [UsersService, BcryptUtil, EmailService],
  exports: [UsersService],
  imports: [
    UsertypeModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: JWT_SECRET,
        signOptions: { expiresIn: '2000000s' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
