import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [StatusService],
  controllers: [StatusController],
  exports: [StatusService],
  imports: [TypeOrmModule.forFeature([Status])],
})
export class StatusModule {}
