import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsertypeModule } from './usertype/usertype.module';
import { StatusModule } from './status/status.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from '../db/data-source';
import { EventsModule } from './events/events.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    UsertypeModule,
    StatusModule,
    EventsModule,
    EmailModule,
    RegistrationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
