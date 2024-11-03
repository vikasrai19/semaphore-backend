import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/user.entity';

@Entity('Notifications')
export class Notifications {
  @PrimaryColumn()
  notificationId: string;
  @Column()
  notificationTitle: string;
  @Column()
  notificationContent: string;
  @ManyToOne(() => User, (user) => user.notications)
  @JoinColumn()
  user: User;
  @Column({ default: false })
  isRead: boolean;
  @Column()
  notificationTime: string;
}
