import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './entities/event.entity';
import { EventRules } from './entities/event-rules.entity';
import { UsersModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { EventHeads } from './entities/event-heads.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService, JwtService],
  imports: [
    TypeOrmModule.forFeature([Events, EventRules, EventHeads]),
    UsersModule,
  ],
})
export class EventsModule {}
