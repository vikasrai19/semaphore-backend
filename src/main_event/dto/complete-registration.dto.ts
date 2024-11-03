import { MemberDetalsDto } from './member-details.dto';

export class CompleteRegistrationDto {
  eventId: string;
  eventName: string;
  memberCount: number;
  memberList: MemberDetalsDto[];
}
