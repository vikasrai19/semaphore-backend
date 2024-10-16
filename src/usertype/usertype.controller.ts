import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserType } from './usertype.entity';
import { UsertypeService } from './usertype.service';

@Controller('/web/api/usertype')
export class UsertypeController {

  constructor(private readonly usertypeService: UsertypeService) {}

  @Get('/v1/FindAll')
  async findAll(): Promise<UserType[]> {
    return await this.usertypeService.findAll();
  }

  @Post('/v1/Create')
  async createUserType(@Body() userTypeData: { userType: string, orderNo: number }): Promise<UserType> {
    return await this.usertypeService.createUserType(userTypeData);
  }

  @Get('/v1/FindById')
  async findById(@Param('userTypeId') userTypeId: string): Promise<UserType> {
    return await this.usertypeService.findById(userTypeId);
  }

  @Post('/v1/Update')
  async updateUserType(@Body() userTypeData: { userTypeId: string, userType: string, orderNo: number}): Promise<string> {
    return await this.usertypeService.updateUserType(userTypeData);
  }

  @Get('/v1/FindByUserType')
  async findByUserType(@Param('userType') userType: string): Promise<UserType> {
    return await this.usertypeService.findUserTypeByName(userType);
  }

  @Get('/v1/FindByOrderNo')
  async findByOrderNo(@Param('orderNo') orderNo: number): Promise<UserType> {
    return await this.usertypeService.findUserTypeByOrderNo(orderNo);
  }
}
