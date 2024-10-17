import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserType } from '../usertype/usertype.entity';

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
}
