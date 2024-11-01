import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Events } from './event.entity';
import { User } from '../../users/user.entity';

@Entity('EventHeads')
export class EventHeads {
  @PrimaryColumn('uuid')
  eventHeadId: string;
  @ManyToOne(() => User, (user) => user.event)
  @JoinColumn({ name: 'userId' })
  user: User;
  @ManyToOne(() => Events, (event) => event.eventHeads)
  @JoinColumn({ name: 'eventId' })
  event: Events;
}
