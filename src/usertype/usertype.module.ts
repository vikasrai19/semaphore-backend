import { Module } from '@nestjs/common';
import { UsertypeService } from './usertype.service';
import { UsertypeController } from './usertype.controller';
import { UserType } from './usertype.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsertypeService, JwtService],
  controllers: [UsertypeController],
  exports: [UsertypeService],
  imports: [TypeOrmModule.forFeature([UserType])],
})
export class UsertypeModule {}
