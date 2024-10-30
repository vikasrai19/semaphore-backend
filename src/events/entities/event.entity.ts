import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { EventRules } from './event-rules.entity';

@Entity('Events')
export class Events {
  @PrimaryColumn('uuid')
  eventId: string;
  @Column({ unique: true })
  eventName: string;
  @JoinColumn({ name: 'staffCoordinatorId' })
  @OneToOne(() => User)
  staffCoordinator: User;
  @JoinColumn({ name: 'eventHead1Id' })
  @OneToOne(() => User)
  eventHead1: User;
  @JoinColumn({ name: 'eventHead2Id' })
  @OneToOne(() => User)
  eventHead2: User;
  @JoinColumn({ name: 'juniorHeadId' })
  @OneToOne(() => User)
  juniorHead: User;
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
}
