import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Patient } from './Patient';
import { Psychologist } from './psychologist.entitie';

@Index('patient_appointment_registry_pkey', ['id'], { unique: true })
@Entity('patient_appointment_registry', { schema: 'public' })
export class PatientAppointmentRegistry {
  @Column('text', { primary: true, name: 'id' })
  id!: string;

  @Column('timestamp with time zone', {
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column('json', { name: 'registry' })
  registry!: object;

  @ManyToOne(() => Patient, (patient) => patient.patientAppointmentRegistries, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'patient_id', referencedColumnName: 'id' }])
  patient!: Patient;

  @ManyToOne(
    () => Psychologist,
    (psychologist) => psychologist.patientAppointmentRegistries,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'psychologist_id', referencedColumnName: 'id' }])
  psychologist!: Psychologist;
}
