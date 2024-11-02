import { v4 as uuid4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { RegistrationDto } from './dto/registration.dto';
import { UsertypeService } from '../usertype/usertype.service';
import { Registration } from './entities/registration.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { College } from './entities/college.entity';
import { StatusService } from '../status/status.service';

@Injectable()
export class RegistrationService {
  constructor(
    private userService: UsersService,
    private userTypeService: UsertypeService,
    private statusService: StatusService,
    @InjectRepository(Registration)
    private readonly registrationRepo: Repository<Registration>,
    @InjectRepository(College)
    private readonly collegeRepo: Repository<College>,
  ) {}

  async createRegistration(registrationData: RegistrationDto): Promise<string> {
    const user = await this.userService.findUserByEmail(registrationData.email);
    const registrationUser = await this.registrationRepo.findOne({
      where: { user },
    });
    if (registrationUser != null) {
      throw new BadRequestException('Registration already done by the user');
    }

    const teamNameCount = await this.registrationRepo.count({
      where: { teamName: registrationData.teamName },
    });
    if (teamNameCount >= 1) {
      throw new BadRequestException('Team Name already taken');
    }
    const collegeRegCount = await this.collegeRepo.count({
      where: { collegeId: registrationData.collegeId },
    });
    if (collegeRegCount >= 2) {
      throw new BadRequestException(
        'Max of only 2 registrations allowed per college',
      );
    }
    const college = await this.collegeRepo.findOne({
      where: { collegeId: registrationData.collegeId },
    });
    const userType =
      await this.userTypeService.findUserTypeByName('Participant');
    const newUser = await this.userService.registerUserForEvent(
      registrationData.fullName,
      registrationData.email,
      registrationData.phoneNumber,
      userType,
      registrationData.password,
    );

    const pendingStatus = await this.statusService.findStatusByName('Pending');

    const newRegistrationData = this.registrationRepo.create({
      registrationId: uuid4(),
      user: newUser,
      teamName: registrationData.teamName,
      college: college,
      status: pendingStatus,
    });
    await this.registrationRepo.save(newRegistrationData);
    return 'Account Created Successfully .. Please verify your email id';
  }
}