import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { Notifications } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [NotificationsService],
  controllers: [NotificationsController],
  imports: [TypeOrmModule.forFeature([Notifications])],
})
export class NotificationsModule {}
