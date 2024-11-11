import {
  CompleteRegistrationDto,
  UpdateExistingRegistrationDto,
} from './complete-registration.dto';

export class EventRegistrationDto {
  userId: string;
  eventRegistrationDetails: CompleteRegistrationDto[];
}

export class UpdateEventRegistrationDto {
  userId: string;
  eventRegistrationDetails: UpdateExistingRegistrationDto[];
}
