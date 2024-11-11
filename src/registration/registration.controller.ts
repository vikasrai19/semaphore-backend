import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDto } from './dto/registration.dto';
import { College } from './entities/college.entity';
import { Registration } from './entities/registration.entity';
import { SuAndAdminGuard } from 'src/auth/guards/auth.guard';
import { TeamNameDto } from './dto/team-name.dto';

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

  @UseGuards(SuAndAdminGuard)
  @Get('v1/GetRegisteredCollegeList')
  async getRegisteredCollegeList(): Promise<Registration[]> {
    return await this.registrationService.getRegisteredCollegeList();
  }

  @Post('/v1/AssignTeamName')
  async assignTeamName(teamNameData: TeamNameDto): Promise<string> {
    return await this.registrationService.updateTeamName(teamNameData);
  }
}
