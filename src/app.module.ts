import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsertypeModule } from './usertype/usertype.module';
import { StatusModule } from './status/status.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from '../db/data-source';
import { BcryptUtil } from './utils/bcrypt.util';

@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions),
    UsersModule,
    AuthModule,
    UsertypeModule,
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
