import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MainEventService } from './main_event.service';
import {
  EventRegistrationDto,
  UpdateEventRegistrationDto,
} from './dto/event-registration.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentDetails } from 'src/registration/entities/payment-details.entity';
import {
  ParticipantAuthGuard,
  SuperUserAuthGuard,
} from 'src/auth/guards/auth.guard';
import { TeamScores } from './entities/team-scores.entity';
import { UpdateScoreDto } from './dto/update-scores.dto';
import { EventTeams } from './entities/event-teams.entities';
import { EventHeadDashboardDto } from './dto/event-head-dashboard.dto';
import { PromoteTeamDto } from './dto/promoto-team.dto';

@Controller('/web/api/mainEvent')
export class MainEventController {
  constructor(private readonly mainEventService: MainEventService) {}

  @UseGuards(ParticipantAuthGuard)
  @Get('v1/IsAlreadyRegistred')
  async isAlreadyRegistred(@Query('userId') userId: string): Promise<boolean> {
    return await this.mainEventService.isAlreadyRegistred(userId);
  }

  @UseGuards(ParticipantAuthGuard)
  @Post('/v1/CompleteRegistration')
  async completeRegistration(
    @Body() registrationData: EventRegistrationDto,
  ): Promise<string> {
    return await this.mainEventService.completeRegistration(registrationData);
  }

  @UseGuards(ParticipantAuthGuard)
  @Post('/v1/AcceptPaymentDetails')
  async acceptPaymentDetails(
    @Body() paymentDetails: PaymentDto,
  ): Promise<string> {
    return await this.mainEventService.acceptPaymentDetails(paymentDetails);
  }

  @UseGuards(ParticipantAuthGuard)
  @Get('/v1/GetPaymentHistory')
  async getPaymentHistory(
    @Query('userId') userId: string,
  ): Promise<PaymentDetails[]> {
    return await this.mainEventService.getPaymentHistory(userId);
  }

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/VerifyTransaction')
  async verifyTransaction(
    @Body()
    paymentData: {
      paymentId: string;
      userId: string;
      statusId: string;
    },
  ): Promise<string> {
    return this.mainEventService.verifyTransaction(paymentData.paymentId);
  }

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/RejectTransaction')
  async rejectTransaction(
    @Body()
    paymentData: {
      paymentId: string;
      userId: string;
      remarks: string;
    },
  ): Promise<string> {
    return this.mainEventService.rejectTransaction(
      paymentData.paymentId,
      paymentData.userId,
      paymentData.remarks,
    );
  }

  @UseGuards(ParticipantAuthGuard)
  @Get('/v1/IsPaymentPending')
  async isPaymentPending(@Query('userId') userId: string): Promise<boolean> {
    return await this.mainEventService.isPaymentPending(userId);
  }

  @UseGuards(SuperUserAuthGuard)
  @Get('/v1/GetPendingPaymentList')
  async getPendingPaymentListForSU(): Promise<PaymentDetails[]> {
    return await this.mainEventService.getPendingPaymentListForSU();
  }

  @Get('/v1/GetTeamScoresForEventHeads')
  async getTeamScoresForEventHeads(
    @Query('userId') userId: string,
    @Query('roundNo') roundNo: number,
  ): Promise<TeamScores[]> {
    return await this.mainEventService.getTeamScoresForEventHeads(
      userId,
      roundNo,
    );
  }

  @Post('/v1/UpdateTeamScoreForEventHeads')
  async updateTeamScoreForEventHeads(
    @Body() scoreData: UpdateScoreDto,
  ): Promise<string> {
    return await this.mainEventService.updateTeamScoreForEventHeads(scoreData);
  }

  @Get('/v1/GetTeamRanking')
  async getTeamRaking(@Query('userId') userId: string): Promise<TeamScores[]> {
    return await this.mainEventService.getTeamRankings(userId);
  }

  @Get('/v1/GetEventTeamsForHead')
  async getEventTeamsForHead(
    @Query('userId') userId: string,
  ): Promise<EventTeams[]> {
    return await this.mainEventService.getEventTeamsForHead(userId);
  }

  @Get('/v1/GetEventHeadDashbord')
  async getEventHeadDashboard(
    @Query('userId') userId: string,
  ): Promise<EventHeadDashboardDto> {
    return await this.mainEventService.getEventHeadDashboard(userId);
  }

  @Post('/v1/PromoteTeamToNextRound')
  async promoteTeamToNextRound(@Body() data: PromoteTeamDto): Promise<string> {
    return await this.mainEventService.promotTeamToNextRound(data);
  }

  @Post('/v1/GetEventRankings')
  async getEventRankings(
    @Body() data: { eventId: string },
  ): Promise<TeamScores[]> {
    return await this.mainEventService.getTeamScoreRanking(data.eventId);
  }

  @Get('/v1/GetEventTeamsForPromotion')
  async getEventTeamsForPromotion(
    @Query('userId') userId: string,
  ): Promise<TeamScores[]> {
    return await this.mainEventService.getEventTeamsForPromotion(userId);
  }

  @UseGuards(ParticipantAuthGuard)
  @Post('/v1/UpdateTeamMemberDetails')
  async getEventTeamMembers(
    @Body() registrationData: UpdateEventRegistrationDto,
  ): Promise<string> {
    return await this.mainEventService.updateEventRegistrationData(
      registrationData,
    );
  }
}
