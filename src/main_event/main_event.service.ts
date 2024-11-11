import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventTeams } from './entities/event-teams.entities';
import { In, Repository } from 'typeorm';
import { RegistrationService } from 'src/registration/registration.service';
import { EventRegistrationDto } from './dto/event-registration.dto';
import { EventsService } from 'src/events/events.service';
import { EventMembers } from './entities/event-members.entity';
import { v4 as uuid4 } from 'uuid';
import { TeamScores } from './entities/team-scores.entity';
import { PaymentDto } from './dto/payment.dto';
import { StatusService } from 'src/status/status.service';
import { PaymentDetails } from 'src/registration/entities/payment-details.entity';
import { EmailService } from 'src/email/email.service';
import { UpdateScoreDto } from './dto/update-scores.dto';
import {
  CardDetailsDto,
  EventHeadDashboardDto,
} from './dto/event-head-dashboard.dto';
import { EventHeads } from 'src/events/entities/event-heads.entity';
import { PromoteTeamDto } from './dto/promoto-team.dto';

@Injectable()
export class MainEventService {
  constructor(
    @InjectRepository(EventTeams)
    private readonly eventTeamRepo: Repository<EventTeams>,
    @InjectRepository(EventMembers)
    private readonly eventMemberRepo: Repository<EventMembers>,
    @InjectRepository(TeamScores)
    private readonly teamScoreRepo: Repository<TeamScores>,
    @InjectRepository(PaymentDetails)
    private readonly paymentRepo: Repository<PaymentDetails>,
    private readonly registrationService: RegistrationService,
    private readonly eventService: EventsService,
    private readonly statusService: StatusService,
    private readonly emailService: EmailService,
  ) {}

  async isAlreadyRegistred(userId: string): Promise<boolean> {
    const registration =
      await this.registrationService.findRegistrationByUserId(userId);

    const teamDataCount = await this.eventTeamRepo.count({
      where: { registration },
    });
    if (teamDataCount > 0) {
      return true;
    }
    return false;
  }

  async completeRegistration(
    registrationData: EventRegistrationDto,
  ): Promise<string> {
    const registration =
      await this.registrationService.findRegistrationByUserId(
        registrationData.userId,
      );
    if (registration === null) {
      throw new BadRequestException('Registration not found');
    }
    registrationData.eventRegistrationDetails.forEach(async (data) => {
      // Get the event data
      const eventData = await this.eventService.findEventById(data.eventId);

      //   Create a event team instance
      const eventTeam = this.eventTeamRepo.create({
        eventTeamId: uuid4(),
        registration: registration,
        currentRound: 1,
        event: eventData,
      });
      const eventTeamSavedData = await this.eventTeamRepo.save(eventTeam);

      //   Create a team score instance
      const teamScore = this.teamScoreRepo.create({
        eventScoreId: uuid4(),
        eventTeam: eventTeamSavedData,
        roundNo: 1,
        score: 0,
      });
      await this.teamScoreRepo.save(teamScore);

      if (eventData !== null) {
        data.memberList.forEach(async (member) => {
          const newMemberData = this.eventMemberRepo.create({
            eventMemberId: uuid4(),
            memberName: member.memberName,
            memberPhoneNumber: member.memberPhoneNumber,
            eventTeam: eventTeamSavedData,
          });
          await this.eventMemberRepo.save(newMemberData);
        });
      }
    });
    return 'Registration completed successfully';
  }

  async acceptPaymentDetails(paymentDetails: PaymentDto): Promise<string> {
    const status = await this.statusService.findStatusByName(
      'Waiting For Confirmation',
    );
    const registration =
      await this.registrationService.findRegistrationByUserId(
        paymentDetails.userId,
      );

    if (registration === null) {
      throw new BadRequestException('Registration not found');
    }
    const paymentData = this.paymentRepo.create({
      paymentDetailsId: uuid4(),
      accountHolderName: paymentDetails.accountHolderName,
      phoneNumber: paymentDetails.phoneNumber,
      upiId: paymentDetails.upiId,
      transactionId: paymentDetails.transactionId,
      status: status,
      registration: registration,
      remarks: '',
    });
    await this.paymentRepo.save(paymentData);
    return 'Payment details accepted Successfully .. Please wait for confirmation';
  }

  async getPaymentHistory(userId: string): Promise<PaymentDetails[]> {
    const registration =
      await this.registrationService.findRegistrationByUserId(userId);
    if (registration === null) {
      throw new BadRequestException('Registration not found');
    }
    const paymentHistory = await this.paymentRepo.find({
      where: { registration },
      relations: ['status', 'registration', 'registration.user'],
    });
    return paymentHistory;
  }

  async verifyTransaction(transactionId: string): Promise<string> {
    const paymentData = await this.paymentRepo.findOne({
      where: { paymentDetailsId: transactionId },
      relations: ['registration', 'registration.user'],
    });
    const status = await this.statusService.findStatusByName('Successful');
    paymentData.status = status;
    await this.paymentRepo.save(paymentData);
    await this.registrationService.acceptRegistration(
      paymentData.registration.user.userId,
    );
    await this.emailService.sendPaymentAcceptedEmail(
      paymentData.registration.user.email,
      paymentData.registration.user.fullName,
    );
    return 'Payment verified successfully';
  }

  async rejectTransaction(
    transactionId: string,
    userId: string,
    remarks: string,
  ): Promise<string> {
    const paymentData = await this.paymentRepo.findOne({
      where: { paymentDetailsId: transactionId },
      relations: ['status'],
    });
    const status = await this.statusService.findStatusByName('Rejected');
    paymentData.status = status;
    paymentData.remarks = remarks;
    await this.paymentRepo.save(paymentData);
    const registration =
      await this.registrationService.findRegistrationByUserId(userId);
    await this.emailService.sendPaymentRejectedEmail(
      registration.user.email,
      registration.user.fullName,
      remarks,
    );
    return 'Payment rejected successfully';
  }

  async isPaymentPending(userId: string): Promise<boolean> {
    const registration =
      await this.registrationService.findRegistrationByUserId(userId);
    const paymentCount = await this.paymentRepo.count({
      where: {
        status: { status: In(['Successful', 'Waiting for confirmation']) },
        registration: registration,
      },
    });
    if (paymentCount === 0) {
      return true;
    }

    return false;
  }

  async getPendingPaymentListForSU(): Promise<PaymentDetails[]> {
    const paymentDetails = await this.paymentRepo.find({
      where: { status: { status: 'Waiting For Confirmation' } },
      relations: [
        'registration',
        'registration.user',
        'registration.college',
        'status',
      ],
    });
    return paymentDetails;
  }

  async getTeamScoresForEventHeads(
    userId: string,
    roundNo: number,
  ): Promise<TeamScores[]> {
    const eventHead = await this.eventService.findEventByUserId(userId);
    const teamScores = await this.teamScoreRepo.find({
      where: {
        eventTeam: { event: { eventId: eventHead.event.eventId } },
        roundNo: roundNo,
      },
      relations: ['eventTeam', 'eventTeam.registration'],
    });
    return teamScores;
  }

  async updateTeamScoreForEventHeads(
    scoreData: UpdateScoreDto,
  ): Promise<string> {
    const eventHead = await this.eventService.findEventByUserId(
      scoreData.userId,
    );
    const teamScores = await this.teamScoreRepo.find({
      where: {
        eventTeam: { event: { eventId: eventHead.event.eventId } },
        roundNo: scoreData.roundNo,
      },
    });
    teamScores.forEach(async (teamScore) => {
      if (teamScore.score === 0) {
        const teamScoreData = scoreData.scoreData.filter(
          (data) => data.teamId === teamScore.eventTeam.eventTeamId,
        );
        teamScore.score = teamScoreData[0].marks;
        await this.teamScoreRepo.save(teamScore);
      }
    });
    return 'Successfully updated';
  }

  async getTeamRankings(userId: string): Promise<TeamScores[]> {
    const eventHead = await this.eventService.findEventByUserId(userId);
    const teamScores = await this.teamScoreRepo
      .createQueryBuilder('teamScores')
      .leftJoin('teamScores.eventTeam', 'eventTeam')
      .leftJoin('eventTeam.registration', 'registration')
      .select('registration.registrationId', 'registrationId')
      .select('registration.teamName', 'teamName')
      .addSelect('SUM(teamScores.score)', 'totalScore')
      .where('eventTeam.event = :eventId', { eventId: eventHead.event.eventId })
      .groupBy('registration.registrationId')
      .orderBy('totalScore', 'DESC')
      .getRawMany();

    return teamScores;
  }

  async getEventTeamsForHead(userId: string): Promise<EventTeams[]> {
    const eventHead = await this.eventService.findEventByUserId(userId);
    return await this.eventTeamRepo.find({
      where: {
        event: eventHead.event,
      },
      relations: ['eventMembers', 'registration', 'event'],
    });
  }

  // TODO: Dashboard endpoint
  async getEventHeadDashboard(userId: string): Promise<EventHeadDashboardDto> {
    const eventHead: EventHeads =
      await this.eventService.findEventByUserId(userId);
    const eventRankings = await this.teamScoreRepo
      .createQueryBuilder('teamScores')
      .leftJoin('teamScores.eventTeam', 'eventTeam')
      .leftJoin('eventTeam.registration', 'registration')
      .select('registration.teamName', 'teamName')
      .addSelect('SUM(teamScores.score)', 'totalScore')
      .where('eventTeam.event = :eventId', { eventId: eventHead.event.eventId })
      .groupBy('registration.teamName')
      .orderBy('totalScore', 'DESC')
      .limit(3)
      .getRawMany();

    const totalTeamCount = await this.eventTeamRepo.count({
      where: { event: eventHead.event },
    });
    const currentRound = await this.eventService.getCurrentRound(
      eventHead.event.eventId,
    );
    const activeTeams = await this.teamScoreRepo.count({
      where: { eventTeam: { event: eventHead.event }, roundNo: currentRound },
    });

    const cardDetailsList: CardDetailsDto[] = [];
    cardDetailsList.push(new CardDetailsDto('Total Teams', totalTeamCount));
    cardDetailsList.push(new CardDetailsDto('Current Round', currentRound));
    cardDetailsList.push(new CardDetailsDto('Active Teams', activeTeams));
    return new EventHeadDashboardDto(cardDetailsList, eventRankings);
  }

  async promotTeamToNextRound(data: PromoteTeamDto): Promise<string> {
    const eventTeam = await this.eventTeamRepo.findOne({
      where: { eventTeamId: data.teamId },
    });
    eventTeam.currentRound = data.roundNo;
    await this.eventTeamRepo.save(eventTeam);
    // TODO: Send Email Notification
    const teamScoreData = this.teamScoreRepo.create({
      eventScoreId: uuid4(),
      eventTeam: eventTeam,
      score: 0,
      roundNo: data.roundNo,
    });
    await this.teamScoreRepo.save(teamScoreData);
    return 'Promoted Successfully';
  }

  async getTeamScoreRanking(eventId: string): Promise<TeamScores[]> {
    const teamScores = await this.teamScoreRepo
      .createQueryBuilder('teamScores')
      .leftJoin('teamScores.eventTeam', 'eventTeam')
      .leftJoin('eventTeam.registration', 'registration')
      .select('registration.teamName', 'teamName')
      .addSelect('SUM(teamScores.score)', 'totalScore')
      .where('eventTeam.event = :eventId', { eventId: eventId })
      .groupBy('registration.teamName')
      .orderBy('totalScore', 'DESC')
      .getRawMany();
    return teamScores;
  }

  async getEventTeamsForPromotion(userId: string): Promise<TeamScores[]> {
    const eventHead = await this.eventService.findEventByUserId(userId);
    const eventTeams = await this.teamScoreRepo.find({
      where: {
        eventTeam: { event: eventHead.event },
        roundNo: eventHead.event.currentRound,
      },
      relations: ['eventTeam', 'eventTeam.registration'],
    });
    return eventTeams;
  }
}
