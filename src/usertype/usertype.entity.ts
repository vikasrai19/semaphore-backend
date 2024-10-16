import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('UserTypes')
export class UserType {
  @PrimaryColumn('uuid')
  userTypeId: string;
  @Column()
  userType: string;
  @Column()
  orderNo: number;
  @OneToMany(() => User, (userType) => userType.userType)
  users: User[];
}
