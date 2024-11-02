import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { UsersModule } from '../users/users.module';
import { UsertypeModule } from '../usertype/usertype.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { College } from './entities/college.entity';
import { StatusModule } from '../status/status.module';
import { EmailService } from '../email/email.service';

@Module({
  providers: [RegistrationService, EmailService],
  controllers: [RegistrationController],
  imports: [
    TypeOrmModule.forFeature([Registration, College]),
    UsersModule,
    UsertypeModule,
    StatusModule,
  ],
})
export class RegistrationModule {}
