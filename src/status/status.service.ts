import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './status.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async findAll(): Promise<Status[]> {
    return await this.statusRepository.find();
  }

  async createStatus(statusData: { status: string }): Promise<Status> {
    const statusResponse = await this.statusRepository.findOneBy({
      status: statusData.status,
    });
    if (statusResponse !== null && statusResponse !== undefined) {
      throw new BadRequestException('Status data is already present');
    }
    const newStatus = this.statusRepository.create({
      ...statusData,
      statusId: uuid4(),
    });
    return await this.statusRepository.save(newStatus);
  }

  async findStatusById(statusId: string): Promise<Status | null> {
    return await this.statusRepository.findOneBy({ statusId });
  }

  async findStatusByName(status: string): Promise<Status | null> {
    return await this.statusRepository.findOneBy({ status });
  }

  async updateStatus(statusData: {
    statusId: string;
    status: string;
  }): Promise<string> {
    const status = await this.statusRepository.findOneBy({
      statusId: statusData.statusId,
    });
    if (status == null) {
      throw new BadRequestException('Status data is not found');
    }

    status.status = statusData.status;
    await this.statusRepository.save(status);
    return 'Status data updated successfully';
  }
}
