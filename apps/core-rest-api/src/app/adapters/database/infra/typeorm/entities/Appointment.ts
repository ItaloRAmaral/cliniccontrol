import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentMethod } from '../../../../../core/shared/interfaces/payments';
import { Clinic } from './Clinic';
import { Patient } from './Patient';
import { Psychologist } from './psychologist.entitie';

@Index('appointment_pkey', ['id'], { unique: true })
@Entity('appointment', { schema: 'public' })
export class Appointment {
  @Column('text', { primary: true, name: 'id' })
  id!: string;

  @Column('timestamp with time zone', { name: 'date' })
  date!: Date;

  @Column('boolean', { name: 'online', default: () => 'false' })
  online!: boolean;

  @Column('boolean', { name: 'confirmed', default: () => 'false' })
  confirmed!: boolean;

  @Column('timestamp with time zone', { name: 'confirmation_date', nullable: true })
  confirmationDate!: Date | null;

  @Column('boolean', { name: 'cancelled', default: () => 'false' })
  cancelled!: boolean;

  @Column('timestamp with time zone', { name: 'cancellation_date', nullable: true })
  cancellationDate!: Date | null;

  @Column('boolean', { name: 'done', default: () => 'false' })
  done!: boolean;

  @Column('boolean', { name: 'missed', nullable: true })
  missed!: boolean | null;

  @Column('boolean', { name: 'paid', nullable: true, default: () => 'false' })
  paid!: boolean | null;

  @Column('enum', {
    name: 'payment_method',
    enum: PaymentMethod,
    default: () => PaymentMethod.HEALTH_INSURANCE,
  })
  paymentMethod!: PaymentMethod;

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

  @ManyToOne(() => Clinic, (clinic) => clinic.appointments, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'clinic_id', referencedColumnName: 'id' }])
  clinic!: Clinic;

  @ManyToOne(() => Patient, (patient) => patient.appointments, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient!: Patient;

  @ManyToOne(() => Psychologist, (psychologist) => psychologist.appointments, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'psychologist_id', referencedColumnName: 'id' }])
  psychologist!: Psychologist;
}
