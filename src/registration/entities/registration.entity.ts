import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { College } from './college.entity';
import { Status } from '../../status/status.entity';
import { EventTeams } from '../../main_event/entities/event-teams.entities';
import { PaymentDetails } from './payment-details.entity';

@Entity('Registration')
export class Registration {
  @PrimaryColumn()
  registrationId: string;
  @OneToOne(() => User)
  @JoinColumn()
  user: User;
  @OneToOne(() => College, (college) => college.registration)
  @JoinColumn()
  college: College;
  @Column()
  teamName: string;
  @ManyToOne(() => Status)
  @JoinColumn()
  status: Status;
  @OneToMany(() => EventTeams, (eventTeam) => eventTeam.registration)
  eventTeams: EventTeams[];
  @Column({ default: false })
  isPaid: boolean;
  @OneToMany(
    () => PaymentDetails,
    (paymentDetails) => paymentDetails.registration,
  )
  paymentDetails: PaymentDetails[];
  @Column({ default: false })
  isTeamReported: boolean;
}
