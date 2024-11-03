import { CompleteRegistrationDto } from './complete-registration.dto';

export class EventRegistrationDto {
  userId: string;
  eventRegistrationDetails: CompleteRegistrationDto[];
}
