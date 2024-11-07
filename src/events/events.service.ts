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
import { MultipleEventDto } from './dto/mutliple-event-dto';
import { EventHeads } from './entities/event-heads.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    @InjectRepository(EventRules)
    private readonly eventRulesRepository: Repository<EventRules>,
    @InjectRepository(EventHeads)
    private readonly eventHeadRepository: Repository<EventHeads>,
    private readonly userService: UsersService,
  ) {}

  async createEvent(eventData: CreateEventDto): Promise<Events> {
    let event = await this.eventRepository.findOne({
      where: { eventName: eventData.eventName },
    });
    if (event != null) {
      throw new BadRequestException('Event already exists');
    }

    const eventHead1 = await this.userService.findUserById(
      eventData.eventHead1Id,
    );
    const eventHead2 = await this.userService.findUserById(
      eventData.eventHead2Id,
    );
    event = this.eventRepository.create({
      eventId: uuid4(),
      eventName: eventData.eventName,
      eventLogoUrl: eventData.eventLogoUrl,
      memberCount: eventData.memberCount,
      noOfRounds: eventData.noOfRounds,
      orderNo: eventData.orderNo,
      title: eventData.title,
    });

    const savedEvent = await this.eventRepository.save(event);
    const eventHead1Detail = this.eventHeadRepository.create({
      eventHeadId: uuid4(),
      user: eventHead1,
      event: savedEvent,
    });
    const eventHead2Detail = this.eventHeadRepository.create({
      eventHeadId: uuid4(),
      user: eventHead2,
      event: savedEvent,
    });
    await this.eventHeadRepository.save(eventHead1Detail);
    await this.eventHeadRepository.save(eventHead2Detail);
    return savedEvent;
  }

  async findAllEvents(): Promise<Events[]> {
    return await this.eventRepository.find({
      relations: ['eventHeads.user'],
      order: { ['orderNo']: 'ASC' },
    });
  }

  async findEventById(eventId: string): Promise<Events> {
    const event = await this.eventRepository.findOne({
      where: { eventId: eventId },
      relations: ['eventHeads.user', 'eventRules'],
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
    const event = await this.eventRepository.findOne({
      where: { eventId: eventId },
      relations: ['eventRules', 'eventHeads.user'],
    });

    if (event && event.eventRules) {
      event.eventRules.sort((a, b) => a.ruleNo - b.ruleNo);
    }
    return event;
  }

  async addMultipleEvents(eventDataList: MultipleEventDto[]): Promise<string> {
    eventDataList.map(async (ele) => {
      const event = await this.eventRepository.findOne({
        where: { eventName: ele.eventName },
      });
      if (event != null) {
        throw new BadRequestException('Event already exists');
      }
      const eventData = this.eventRepository.create({
        eventId: uuid4(),
        eventName: ele.eventName,
        eventLogoUrl: ele.eventLogoUrl,
        memberCount: ele.memberCount,
        noOfRounds: ele.noOfRounds,
        orderNo: ele.orderNo,
        title: ele.title,
        description: ele.description,
        currentRound: ele.currentRound,
        modelName: ele.modelName,
      });

      const newEvent = await this.eventRepository.save(eventData);
      const eventHead1 = await this.userService.findUserByPhoneNumber(
        ele.eventHead1PhoneNumber,
      );
      const eventHead2 = await this.userService.findUserByPhoneNumber(
        ele.eventHead2PhoneNumber,
      );
      const eventHead1Detail = this.eventHeadRepository.create({
        eventHeadId: uuid4(),
        user: eventHead1,
        event: newEvent,
      });
      const eventHead2Detail = this.eventHeadRepository.create({
        eventHeadId: uuid4(),
        user: eventHead2,
        event: newEvent,
      });
      await this.eventHeadRepository.save(eventHead1Detail);
      await this.eventHeadRepository.save(eventHead2Detail);

      ele.eventRules.map(async (el) => {
        if (newEvent === undefined || newEvent === null) {
          throw new BadRequestException('Event doesnot exists');
        }
        let eventRule = await this.eventRulesRepository.findOne({
          where: { event: newEvent, ruleNo: el.ruleNo },
        });
        if (eventRule != null) {
          throw new BadRequestException('Event Rule No already exists');
        }

        eventRule = await this.eventRulesRepository.findOne({
          where: { event: newEvent, eventRule: el.eventRule },
        });
        if (eventRule != null) {
          //          throw new BadRequestException('Event Rule already exists');
        }

        eventRule = this.eventRulesRepository.create({
          ...el,
          eventRulesId: uuid4(),
          event: newEvent,
        });
        await this.eventRulesRepository.save(eventRule);
      });
    });
    return 'Successfully uploaded';
  }

  async getEventDetailsForRegistration(): Promise<Events[]> {
    return await this.eventRepository.find({
      select: ['eventName', 'eventId', 'noOfRounds', 'memberCount'],
      order: { ['orderNo']: 'ASC' },
    });
  }

  async findEventByUserId(userId: string): Promise<EventHeads> {
    return await this.eventHeadRepository.findOne({
      where: { user: { userId: userId } },
      relations: ['event']
    });
  }

  async getEventMaxRound(userId: string): Promise<number> {
    const eventHead = await this.eventHeadRepository.findOne({
      where: { user: { userId: userId } },
    });
    return eventHead.event.noOfRounds;
  }
}
