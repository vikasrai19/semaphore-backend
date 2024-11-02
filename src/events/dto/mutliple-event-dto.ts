import { EventRulesDto } from './create-event-rules.dto';

export class MultipleEventDto {
  eventName: string;
  eventHead1PhoneNumber: string;
  eventHead2PhoneNumber: string;
  eventLogoUrl: string;
  memberCount: number;
  noOfRounds: number;
  title: string;
  orderNo: number;
  description: string;
  currentRound: number;
  modelName: string;
  eventRules: EventRulesDto[];
}
