import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Events } from './entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { v4 as uuid4 } from 'uuid';
import { UpdateEventDto } from './dto/update-event.dto';
import { UsersService } from '../users/users.service';
import { CreateEventRulesDto } from './dto/create-event-rules.dto';
import { EventRules } from './entities/event-rules.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    @InjectRepository(EventRules)
    private readonly eventRulesRepository: Repository<EventRules>,
    private readonly userService: UsersService,
  ) {}

  async createEvent(eventData: CreateEventDto): Promise<Events> {
    let event = await this.eventRepository.findOne({
      where: { eventName: eventData.eventName },
    });
    if (event != null) {
      throw new BadRequestException('Event already exists');
    }

    event = this.eventRepository.create({
      ...eventData,
      eventId: uuid4(),
    });

    return await this.eventRepository.save(event);
  }

  async findAllEvents(): Promise<Events[]> {
    return await this.eventRepository.find();
  }

  async findEventById(eventId: string): Promise<Events> {
    const event = await this.eventRepository.findOne({
      where: { eventId: eventId },
    });
    if (event === undefined || event === null) {
      throw new BadRequestException('Event doesnot exists');
    }
    return event;
  }

  async updateEvents(eventData: UpdateEventDto): Promise<Events> {
    const event = await this.eventRepository.findOne({
      where: { eventId: eventData.eventId },
    });
    if (event === undefined || event === null) {
      throw new BadRequestException('Event doesnot exists');
    }
    event.eventName = eventData.eventName;
    event.staffCoordinator = await this.userService.findUserById(
      eventData.staffCoordinatorId,
    );
    event.eventHead1 = await this.userService.findUserById(
      eventData.eventHead1Id,
    );
    event.eventHead2 = await this.userService.findUserById(
      eventData.eventHead2Id,
    );
    event.memberCount = eventData.memberCount;
    event.noOfRounds = eventData.noOfRounds;
    return await this.eventRepository.save(event);
  }

  async addEventRules(eventRulesData: CreateEventRulesDto): Promise<Events> {
    const event = await this.eventRepository.findOne({
      where: { eventId: eventRulesData.eventId },
    });
    if (event === undefined || event === null) {
      throw new BadRequestException('Event doesnot exists');
    }

    eventRulesData.eventRules.map(async (ele) => {
      let eventRule = await this.eventRulesRepository.findOne({
        where: { event, ruleNo: ele.ruleNo },
      });
      if (eventRule != null) {
        throw new BadRequestException('Event Rule No already exists');
      }

      eventRule = await this.eventRulesRepository.findOne({
        where: { event, eventRule: ele.eventRule },
      });
      if (eventRule != null) {
        throw new BadRequestException('Event Rule already exists');
      }

      eventRule = this.eventRulesRepository.create({
        ...ele,
        eventRule: uuid4(),
      });
      await this.eventRulesRepository.save(eventRule);
    });

    return event;
  }

  async getEventRules(eventId: string): Promise<Events> {
    return await this.eventRepository.findOne({
      where: { eventId },
      relations: ['EventRules'],
    });
  }
}
