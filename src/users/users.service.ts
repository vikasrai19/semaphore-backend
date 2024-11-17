import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsertypeService } from '../usertype/usertype.service';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UserType } from '../usertype/usertype.entity';
import { v4 as uuid4 } from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userTypeService: UsertypeService,
    private readonly bcrypt: BcryptUtil,
    private readonly emailService: EmailService,
  ) {}

  async findUserByUserName(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['userType'],
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['userType'], // Include the userType relation
    });
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['userType'], // Include the userType relation
    });
  }

  async findUserByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userRepository.findOneBy({ phoneNumber });
  }

  async findUserById(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { userId },
      relations: ['userType'],
    });
  }

  async getUserTypeFromId(userId: string): Promise<UserType> {
    const user: User = await this.userRepository.findOne({
      where: { userId },
      relations: ['userType'], // Include the userType relation
    });
    if (user == null) {
      throw new BadRequestException('User not found');
    }
    return user.userType;
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = await this.findUserByEmail(userData.email);
    if (user != null) {
      throw new BadRequestException('User already exists');
    }
    const userType = await this.userTypeService.findById(userData.userTypeId);
    const hashedPassword = await this.bcrypt.hashPassword(userData.password);
    const newUser = this.userRepository.create({
      ...userData,
      userId: uuid4(),
      password: hashedPassword,
      userType: userType,
      isEmailValid: true,
    });
    return await this.userRepository.save(newUser);
  }

  async getUserList(): Promise<User[]> {
    return await this.userRepository.find({
      order: {
        userType: { orderNo: 'ASC' },
        fullName: 'ASC',
      },
      relations: ['userType'], // Include the userType relation
    });
  }

  async registerUserForEvent(
    fullName: string,
    email: string,
    phoneNumber: string,
    userType: UserType,
    password: string,
  ): Promise<User> {
    const username = email.split('@')[0];
    const hashedPassword = await this.bcrypt.hashPassword(password);
    const newUser = this.userRepository.create({
      userId: uuid4(),
      fullName,
      email,
      phoneNumber,
      userType,
      username,
      isEmailValid: false,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async verifyUserEmail(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (user === null) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailValid === true) {
      return 'User is already verified';
    }

    user.isEmailValid = true;
    await this.userRepository.save(user);
    return 'Email verified successfully';
  }

  async sendPasswordResetLink(userId: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    await this.emailService.sendPasswordResetLinkEmail(
      user.email,
      user.fullName,
      userId,
    );
    return 'Please check your mail';
  }

  async updateUserPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<string> {
    // const user: User = await this.userService.findUserByEmail(input.email);
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    if (user == null) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = await this.bcrypt.matchPassword(
      oldPassword,
      user.password,
    );
    if (!isMatch) {
      throw new BadRequestException('Old Password doesnot match');
    }

    const hashedPassword = await this.bcrypt.hashPassword(newPassword);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return 'Successfully updated the password';
  }
}
