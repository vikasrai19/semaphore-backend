import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { EventTeams } from './event-teams.entities';

@Entity('EventMembers')
export class EventMembers {
  @PrimaryColumn()
  eventMemberId: string;
  @Column({ nullable: false })
  memberName: string;
  @Column({ nullable: false })
  memberPhoneNumber: string;
  @ManyToOne(() => EventTeams, (eventTeam) => eventTeam.eventMembers)
  eventTeam: EventTeams;
}
