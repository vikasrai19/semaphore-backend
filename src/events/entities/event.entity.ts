import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { EventRules } from './event-rules.entity';
import { EventHeads } from './event-heads.entity';

@Entity('Events')
export class Events {
  @PrimaryColumn('uuid')
  eventId: string;
  @Column({ unique: true })
  eventName: string;
  @Column()
  eventLogoUrl: string;
  @Column({ nullable: false })
  memberCount: number;
  @Column({ nullable: false })
  noOfRounds: number;
  @OneToMany(() => EventRules, (event) => event.event)
  eventRules: EventRules[];
  @Column()
  title: string;
  @Column({ unique: true })
  orderNo: number;
  @Column()
  description: string;
  @Column()
  currentRound: number;
  @OneToMany(() => EventHeads, (eventHead) => eventHead.event)
  eventHeads: EventHeads[];
}
