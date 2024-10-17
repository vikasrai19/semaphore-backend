import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../configs/jwt-secret';
import { SuperUserAuthGuard } from './guards/auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService, BcryptUtil, SuperUserAuthGuard],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
    }),
    forwardRef(() => UsersModule),
  ],
  exports: [SuperUserAuthGuard],
})
export class AuthModule {}
