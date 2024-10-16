import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Status')
export class Status {
  @PrimaryColumn('uuid')
  statusId: string;
  @Column()
  status: string;
}
