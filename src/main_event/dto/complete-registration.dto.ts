import { MemberDetalsDto, UpdateMemberDetailsDto } from './member-details.dto';

export class CompleteRegistrationDto {
  eventId: string;
  eventName: string;
  memberCount: number;
  memberList: MemberDetalsDto[];
}

export class UpdateExistingRegistrationDto {
  eventId: string;
  eventName: string;
  memberCount: number;
  memberList: UpdateMemberDetailsDto[];
}
