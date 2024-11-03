import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MainEventService } from './main_event.service';
import { EventRegistrationDto } from './dto/event-registration.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentDetails } from 'src/registration/entities/payment-details.entity';
import {
  ParticipantAuthGuard,
  SuperUserAuthGuard,
} from 'src/auth/guards/auth.guard';

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
    return this.mainEventService.verifyTransaction(
      paymentData.paymentId,
      paymentData.userId,
      paymentData.statusId,
    );
  }
}
