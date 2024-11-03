import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StatusService } from './status.service';
import { Status } from './status.entity';
import { SuperUserAuthGuard } from '../auth/guards/auth.guard';

@Controller('web/api/status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/Create')
  async createStatus(@Body() statusData: { status: string }): Promise<Status> {
    return await this.statusService.createStatus(statusData);
  }

  @Get('/v1/FindAll')
  async getStatusList(): Promise<Status[]> {
    return await this.statusService.findAll();
  }

  @Get('/v1/FindById')
  async getStatusById(@Param('statusId') statusId: string): Promise<Status> {
    return await this.statusService.findStatusById(statusId);
  }

  @Get('/v1/FindByValue')
  async getStatusByName(@Param('status') status: string): Promise<Status> {
    return await this.statusService.findStatusByName(status);
  }

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/Update')
  async updateStatus(
    @Body() statusData: { statusId: string; status: string },
  ): Promise<string> {
    return await this.statusService.updateStatus(statusData);
  }
}
