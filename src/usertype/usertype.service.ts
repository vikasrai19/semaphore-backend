import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './usertype.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UsertypeService {
  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) {}

  async findAll(): Promise<UserType[]> {
    return await this.userTypeRepository.find();
  }

  async createUserType(userTypeData: {
    userType: string;
    orderNo: number;
  }): Promise<UserType> {
    if (await this.userTypeValueExists(userTypeData.userType)) {
      throw new BadRequestException('User type is already exists');
    }
    if (await this.userTypeOrderNoExists(userTypeData.orderNo)) {
      throw new BadRequestException('User type order no already exists');
    }

    const userType = this.userTypeRepository.create({
      ...userTypeData,
      userTypeId: uuid4(),
    });
    return this.userTypeRepository.save(userType);
  }

  async findById(userTypeId: string): Promise<UserType | null> {
    return await this.userTypeRepository.findOneBy({ userTypeId });
  }

  async updateUserType(userTypeData: {
    userTypeId: string;
    userType: string;
    orderNo: number;
  }): Promise<string> {
    const userType = await this.userTypeRepository.findOneBy({
      userTypeId: userTypeData.userType,
    });
    userType.userType = userTypeData.userType;
    userType.orderNo = userTypeData.orderNo;
    await this.userTypeRepository.save(userType);
    return 'Successfully updated the user type';
  }

  async findUserTypeByName(userType: string): Promise<UserType> {
    return await this.userTypeRepository.findOneBy({ userType });
  }

  async findUserTypeByOrderNo(orderNo: number): Promise<UserType> {
    return await this.userTypeRepository.findOneBy({ orderNo });
  }

  private async userTypeValueExists(userType: string): Promise<boolean> {
    const userTypeResponse = await this.userTypeRepository
      .createQueryBuilder('UserTypes')
      .where('UserTypes.userType = :userType', { userType })
      .getOne();

    return !!userTypeResponse;
  }

  private async userTypeOrderNoExists(orderNo: number): Promise<boolean> {
    const userTypeResponse = await this.userTypeRepository
      .createQueryBuilder('UserTypes')
      .where('UserTypes.orderNo = :orderNo', { orderNo })
      .getOne();

    return !!userTypeResponse;
  }
}
