import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Registration } from '../../registration/entities/registration.entity';
import { EventMembers } from './event-members.entity';
import { TeamScores } from './team-scores.entity';
import { Events } from 'src/events/entities/event.entity';

@Entity('EventTeams')
export class EventTeams {
  @PrimaryColumn()
  eventTeamId: string;
  @ManyToOne(() => Registration, (registration) => registration.eventTeams)
  @JoinColumn()
  registration: Registration;
  @ManyToOne(() => Events)
  @JoinColumn()
  event: Events;
  @OneToMany(() => EventMembers, (eventMember) => eventMember.eventTeam)
  @JoinColumn()
  eventMembers: EventMembers[];
  @Column({ nullable: false })
  currentRound: number;
  @OneToMany(() => TeamScores, (teamScore) => teamScore.eventTeam)
  @JoinColumn()
  teamScores: TeamScores[];
}
