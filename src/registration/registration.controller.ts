import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dto/registration.dto';
import { College } from './entities/college.entity';
import { Registration } from './entities/registration.entity';

@Controller('web/api/registration')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Post('/v1/RegisterParticipant')
  async registerParticipant(
    @Body() registrationData: RegistrationDto,
  ): Promise<string> {
    return await this.registrationService.createRegistration(registrationData);
  }

  @Post('/v1/AddCollege')
  async addCollege(
    @Body() collegeData: { collegeName: string },
  ): Promise<College> {
    return await this.registrationService.addCollege(collegeData.collegeName);
  }

  @Get('v1/GetCollegeList')
  async getCollegeList(): Promise<College[]> {
    return await this.registrationService.getCollegeList();
  }

  @Get('v1/GetRegistrationDetails')
  async getRegistrationByUserId(
    @Query('userId') userId: string,
  ): Promise<Registration> {
    return await this.registrationService.getRegistrationData(userId);
  }
}
