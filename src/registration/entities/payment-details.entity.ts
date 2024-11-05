import { Status } from 'src/status/status.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Registration } from './registration.entity';

@Entity('PaymentDetails')
export class PaymentDetails {
  @PrimaryColumn()
  paymentDetailsId: string;
  @Column()
  accountHolderName: string;
  @Column()
  phoneNumber: string;
  @Column()
  upiId: string;
  @Column()
  transactionId: string;
  @ManyToOne(() => Status)
  @JoinColumn()
  status: Status;
  @ManyToOne(() => Registration, (registration) => registration.paymentDetails)
  @JoinColumn()
  registration: Registration;
  @Column()
  remarks: string;
}
