import { Module } from '@nestjs/common';
import { UsertypeService } from './usertype.service';
import { UsertypeController } from './usertype.controller';
import { UserType } from './usertype.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsertypeService],
  controllers: [UsertypeController],
  exports: [UsertypeService],
  imports: [TypeOrmModule.forFeature([UserType])],
})
export class UsertypeModule {}
