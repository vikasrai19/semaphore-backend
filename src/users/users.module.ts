import { UsersService } from './users.service';
import { UsertypeModule } from '../usertype/usertype.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, BcryptUtil, EmailService],
  exports: [UsersService],
  imports: [
    UsertypeModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2000000s' },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
