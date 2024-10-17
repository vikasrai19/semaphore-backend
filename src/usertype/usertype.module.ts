import { Module } from '@nestjs/common';
import { UsertypeService } from './usertype.service';
import { UsertypeController } from './usertype.controller';
import { UserType } from './usertype.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UsertypeService],
  controllers: [UsertypeController],
  exports: [UsertypeService],
  imports: [TypeOrmModule.forFeature([UserType]), AuthModule],
})
export class UsertypeModule {}
