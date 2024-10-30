import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Events } from './entities/event.entity';
import { EventsService } from './events.service';
import { SuperUserAuthGuard } from '../auth/guards/auth.guard';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventRulesDto } from './dto/create-event-rules.dto';

@Controller('web/api/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/Create')
  async createEvent(@Body() event: CreateEventDto): Promise<Events> {
    return await this.eventsService.createEvent(event);
  }

  @Get('/v1/FindAll')
  async findAll(): Promise<Events[]> {
    return await this.eventsService.findAllEvents();
  }

  @Get('/v1/FindById')
  async findById(@Param('eventId') eventId: string): Promise<Events> {
    return await this.eventsService.findEventById(eventId);
  }

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/Update')
  async updateEvent(@Body() event: UpdateEventDto): Promise<Events> {
    return await this.eventsService.updateEvents(event);
  }

  @UseGuards(SuperUserAuthGuard)
  @Post('/v1/AddEventRules')
  async addEventRules(
    @Body() eventRules: CreateEventRulesDto,
  ): Promise<Events> {
    return await this.eventsService.addEventRules(eventRules);
  }

  @Get('/v1/FindEventRules')
  async getEventRules(@Param('eventId') eventId: string): Promise<Events> {
    return await this.eventsService.getEventRules(eventId);
  }
}
