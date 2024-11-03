import { Module } from '@nestjs/common';
import { MainEventService } from './main_event.service';
import { MainEventController } from './main_event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventTeams } from './entities/event-teams.entities';
import { EventMembers } from './entities/event-members.entity';
import { TeamScores } from './entities/team-scores.entity';
import { RegistrationModule } from 'src/registration/registration.module';
import { EventsModule } from 'src/events/events.module';
import { StatusModule } from 'src/status/status.module';
import { PaymentDetails } from 'src/registration/entities/payment-details.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [MainEventService, EmailService],
  controllers: [MainEventController],
  imports: [
    TypeOrmModule.forFeature([
      EventTeams,
      EventMembers,
      TeamScores,
      PaymentDetails,
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '2000000s' },
      }),
    }),
    RegistrationModule,
    EventsModule,
    StatusModule,
  ],
})
export class MainEventModule {}
