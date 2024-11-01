import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { BcryptUtil } from 'src/utils/bcrypt.util';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../configs/jwt-secret';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: JWT_SECRET,
        signOptions: { expiresIn: '2000000s' },
      }),
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptUtil],
})
export class AuthModule {}
