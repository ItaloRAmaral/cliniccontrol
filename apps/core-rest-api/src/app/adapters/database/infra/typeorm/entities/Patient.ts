import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PaymentMethod } from '../../../../../core/shared/interfaces/payments';
import { Appointment } from './Appointment';
import { Clinic } from './Clinic';
import { PatientAppointmentRegistry } from './PatientAppointmentRegistry';
import { Psychologist } from './psychologist.entitie';

@Index('patient_cpf_key', ['cpf'], { unique: true })
@Index('patient_email_key', ['email'], { unique: true })
@Index('patient_pkey', ['id'], { unique: true })
@Entity('patient', { schema: 'public' })
export class Patient {
  @Column('text', { primary: true, name: 'id' })
  id!: string;

  @Column('text', { name: 'name' })
  name!: string;

  @Column('text', { name: 'email' })
  email!: string;

  @Column('text', { name: 'cpf' })
  cpf!: string;

  @Column('text', { name: 'telephone' })
  telephone!: string;

  @Column('enum', {
    name: 'payment_method',
    enum: PaymentMethod,
    default: () => PaymentMethod.HEALTH_INSURANCE,
  })
  paymentMethod!:
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'PIX'
    | 'MONEY'
    | 'HEALTH_INSURANCE'
    | 'OTHER';

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

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointments!: Appointment[];

  @ManyToOne(() => Clinic, (clinic) => clinic.patients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'clinic_id', referencedColumnName: 'id' }])
  clinic!: Clinic;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.patients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'psychologist_id', referencedColumnName: 'id' }])
  psychologist!: Psychologist;

  @OneToMany(
    () => PatientAppointmentRegistry,
    (patientAppointmentRegistry) => patientAppointmentRegistry.patient,
  )
  patientAppointmentRegistries!: PatientAppointmentRegistry[];
}
