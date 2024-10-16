import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UsertypeService } from '../usertype/usertype.service';
import { BcryptUtil } from '../utils/bcrypt.util';
import { UserType } from '../usertype/usertype.entity';

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
    return await this.userRepository.findOneBy({ email });
  }

  async getUserTypeFromId(userId: string): Promise<UserType> {
    const user: User = await this.userRepository.findOneBy({ userId });
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

    const userType = this.userTypeService.findById(userData.userTypeId);
    const newUser = this.userRepository.create({
      ...userData,
      password: await this.bcrypt.hashPassword(userData.password),
      userType: await userType,
    });
    return await this.userRepository.save(newUser);
  }
}
