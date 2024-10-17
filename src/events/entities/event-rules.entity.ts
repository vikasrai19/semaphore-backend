import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Events } from './event.entity';

@Entity('EventRules')
export class EventRules {
  @PrimaryColumn('uuid')
  eventRulesId: string;
  @Column()
  eventRule: string;
  @Column()
  ruleNo: number;
  @JoinColumn({ name: 'eventId' })
  @ManyToOne(() => Events, (event) => event.eventRules)
  event: Events;
}
