import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EventTeams } from './event-teams.entities';

@Entity('TeamScores')
export class TeamScores {
  @PrimaryColumn()
  eventScoreId: string;
  @ManyToOne(() => EventTeams, (eventTeam) => eventTeam.teamScores)
  @JoinColumn()
  eventTeam: EventTeams;
  @Column()
  roundNo: number;
  @Column()
  score: number;
}
