import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { College } from './college.entity';
import { Status } from '../../status/status.entity';

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
  @OneToOne(() => Status)
  @JoinColumn()
  status: Status;
}
