import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [StatusService, JwtService],
  controllers: [StatusController],
  exports: [StatusService],
  imports: [TypeOrmModule.forFeature([Status]), AuthModule],
})
export class StatusModule {}
