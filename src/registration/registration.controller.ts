import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dto/registration.dto';

@Controller('web/api/registration')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Post('/v1/RegisterParticipant')
  async registerParticipant(
    @Body() registrationData: RegistrationDto,
  ): Promise<string> {
    return await this.registrationService.createRegistration(registrationData);
  }
}
