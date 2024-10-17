export class CreateEventRulesDto {
  eventId: string;
  eventRules: EventRulesDto[];
}

class EventRulesDto {
  eventRule: string;
  ruleNo: number;
}
