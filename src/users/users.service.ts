import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsertypeService } from '../usertype/usertype.service';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UserType } from '../usertype/usertype.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userTypeService: UsertypeService,
    private readonly bcrypt: BcryptUtil,
  ) {}

  async findUserByUserName(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
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
    });
    return await this.userRepository.save(newUser);
  }

  async getUserList(): Promise<User[]> {
    return await this.userRepository.find({
      order: {
        fullName: 'ASC',
      },
      relations: ['userType'], // Include the userType relation
    });
  }
}
