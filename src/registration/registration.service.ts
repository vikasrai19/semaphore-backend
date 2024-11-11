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
import { EmailService } from '../email/email.service';
import { TeamNameDto } from './dto/team-name.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private userService: UsersService,
    private userTypeService: UsertypeService,
    private statusService: StatusService,
    private emailService: EmailService,
    @InjectRepository(Registration)
    private readonly registrationRepo: Repository<Registration>,
    @InjectRepository(College)
    private readonly collegeRepo: Repository<College>,
  ) {}

  async createRegistration(registrationData: RegistrationDto): Promise<string> {
    const user = await this.userService.findUserByEmail(registrationData.email);
    if (user != null) {
      throw new BadRequestException('Registration already done by the user');
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

    const generatedRegistrationId = uuid4();
    const newRegistrationData = this.registrationRepo.create({
      registrationId: generatedRegistrationId,
      user: newUser,
      college: college,
      status: pendingStatus,
      teamName: 'sa',
    });
    await this.registrationRepo.save(newRegistrationData);
    await this.emailService.sendEmailVerificationMail(
      newUser.email,
      newUser.fullName,
      newUser.userId,
    );
    return 'Account Created Successfully .. Please verify your email id';
  }

  async addCollege(collegeName: string): Promise<College> {
    const collegeData = await this.collegeRepo.findOne({
      where: { collegeName },
    });

    if (collegeData !== null) {
      throw new BadRequestException('College is already added');
    }

    const newCollege = this.collegeRepo.create({
      collegeId: uuid4(),
      collegeName,
      collegeLocation: '',
    });
    return await this.collegeRepo.save(newCollege);
  }

  async getCollegeList(): Promise<College[]> {
    return await this.collegeRepo.find({
      order: { ['collegeName']: 'ASC' },
    });
  }

  async findRegistrationByUserId(userId: string): Promise<Registration> {
    const registration = await this.registrationRepo.findOne({
      where: { user: { userId } },
      relations: ['user'],
    });

    return registration;
  }

  async updateRegistrationForPayment(userId: string): Promise<void> {
    const registration = await this.registrationRepo.findOne({
      where: { user: { userId: userId } },
    });
    registration.isPaid = true;
    await this.registrationRepo.save(registration);
  }

  async getRegistrationData(userId: string): Promise<Registration> {
    return await this.registrationRepo
      .createQueryBuilder('registration')
      .leftJoinAndSelect('registration.college', 'college')
      .leftJoinAndSelect('registration.user', 'user')
      .leftJoinAndSelect('registration.status', 'status')
      .leftJoinAndSelect('registration.eventTeams', 'eventTeams')
      .leftJoinAndSelect('eventTeams.event', 'event')
      .leftJoinAndSelect('eventTeams.eventMembers', 'eventMembers')
      .where('user.userId = :userId', { userId })
      .orderBy('event.orderNo', 'ASC')
      .orderBy('eventMembers.memberName', 'DESC')
      .getOne();
  }

  async acceptRegistration(userId: string): Promise<string> {
    const registration = await this.registrationRepo.findOne({
      where: { user: { userId } },
    });
    if (registration === null) {
      throw new BadRequestException('Registration not found');
    }
    registration.status = await this.statusService.findStatusByName('Accepted');
    registration.isPaid = true;
    await this.registrationRepo.save(registration);
    return 'Registration Accepted';
  }

  async getRegisteredCollegeList(): Promise<Registration[]> {
    const registrationList = await this.registrationRepo.find({
      relations: ['college', 'user', 'status'],
    });

    return registrationList;
  }

  async updateTeamName(teamNameData: TeamNameDto): Promise<string> {
    const teamData = await this.registrationRepo.findOne({
      where: { registrationId: teamNameData.registrationId },
    });
    teamData.teamName = teamNameData.teamName;
    await this.registrationRepo.save(teamData);
    return 'Successfully updated the team data';
  }
}
