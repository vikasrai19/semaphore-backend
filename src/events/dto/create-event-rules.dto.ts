export class CreateEventRulesDto {
  eventId: string;
  eventRules: EventRulesDto[];
}

export class EventRulesDto {
  eventRule: string;
  ruleNo: number;
}
