import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { UsersModule } from '../users/users.module';
import { UsertypeModule } from '../usertype/usertype.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entities/registration.entity';
import { College } from './entities/college.entity';
import { StatusModule } from '../status/status.module';

@Module({
  providers: [RegistrationService],
  controllers: [RegistrationController],
  imports: [
    TypeOrmModule.forFeature([Registration, College]),
    UsersModule,
    UsertypeModule,
    StatusModule,
  ],
})
export class RegistrationModule {}
