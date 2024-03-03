import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Appointment } from './Appointment';
import { Patient } from './Patient';
import { Psychologist } from './psychologist.entitie';

@Index('clinic_pkey', ['id'], { unique: true })
@Entity('clinic', { schema: 'public' })
export class Clinic {
  @Column('text', { primary: true, name: 'id' })
  id!: string;

  @Column('text', { name: 'name' })
  name!: string;

  @Column('text', { name: 'address', nullable: true })
  address!: string | null;

  @Column('text', { name: 'city' })
  city!: string;

  @Column('text', { name: 'state' })
  state!: string;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.clinic)
  appointments!: Appointment[];

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.clinics, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'psychologist_id', referencedColumnName: 'id' }])
  psychologist!: Psychologist;

  @OneToMany(() => Patient, (patient) => patient.clinic)
  patients!: Patient[];
}
