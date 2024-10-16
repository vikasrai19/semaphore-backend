import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../configs/jwt-secret';

@Module({
  providers: [AuthService, BcryptUtil],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
    }),
  ],
})
export class AuthModule {}
