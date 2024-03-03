import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Plan, Role } from '../../../../../core/shared/interfaces/payments';
import { Appointment } from './Appointment';
import { Clinic } from './Clinic';
import { Patient } from './Patient';
import { PatientAppointmentRegistry } from './PatientAppointmentRegistry';

@Index('psychologist_email_key', ['email'], { unique: true })
@Index('psychologist_pkey', ['id'], { unique: true })
@Entity('psychologist', { schema: 'public' })
export class Psychologist {
  @Column('text', { primary: true, name: 'id' })
  id!: string;

  @Column('text', { name: 'name' })
  name!: string;

  @Column('text', { name: 'email' })
  email!: string;

  @Column('text', { name: 'password' })
  password!: string;

  @Column('enum', {
    name: 'role',
    enum: Role,
    default: () => Role,
  })
  role!: 'ADMIN' | 'PSYCHOLOGIST' | 'PATIENT';

  @Column('integer', { name: 'price', nullable: true, default: () => '0' })
  price!: number | null;

  @Column('enum', { name: 'plan', enum: Plan, default: () => Plan })
  plan!: 'FREE' | 'BASIC' | 'PREMIUM';

  @Column('integer', { name: 'total_year_earnings', nullable: true, default: () => '0' })
  totalYearEarnings!: number | null;

  @Column('integer', { name: 'total_month_earnings', nullable: true, default: () => '0' })
  totalMonthEarnings!: number | null;

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

  @OneToMany(() => Appointment, (appointment) => appointment.psychologist)
  appointments!: Appointment[];

  @OneToMany(() => Clinic, (clinic) => clinic.psychologist)
  clinics!: Clinic[];

  @OneToMany(() => Patient, (patient) => patient.psychologist)
  patients!: Patient[];

  @OneToMany(
    () => PatientAppointmentRegistry,
    (patientAppointmentRegistry) => patientAppointmentRegistry.psychologist,
  )
  patientAppointmentRegistries!: PatientAppointmentRegistry[];
}
