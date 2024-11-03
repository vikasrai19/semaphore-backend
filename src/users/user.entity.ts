import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserType } from '../usertype/usertype.entity';
import { Events } from 'src/events/entities/event.entity';
import { EventHeads } from '../events/entities/event-heads.entity';
import { Notifications } from '../notifications/entities/notification.entity';

@Entity('Users')
export class User {
  @PrimaryColumn('uuid')
  userId: string;
  @Column({ unique: true })
  username: string;
  @Column()
  fullName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @ManyToOne(() => UserType, (userType) => userType.users)
  @JoinColumn({ name: 'userTypeId' })
  userType: UserType;
  @Column({ default: false })
  isEmailValid: boolean;
  @Column({ length: 15 })
  phoneNumber: string;
  @OneToMany(() => EventHeads, (eventHead) => eventHead.user)
  event: Events;
  @OneToMany(() => Notifications, (notification) => notification.user)
  notications: Notifications[];
}
