import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Registration } from './registration.entity';

@Entity('College')
export class College {
  @PrimaryColumn()
  collegeId: string;
  @Column({ unique: true })
  collegeName: string;
  @Column({ unique: false })
  collegeLocation: string;
  @OneToOne(() => Registration, (registration) => registration.college)
  @JoinColumn()
  registration: Registration;
}
