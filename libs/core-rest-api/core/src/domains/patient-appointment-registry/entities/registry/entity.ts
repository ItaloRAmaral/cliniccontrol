import { randomUUID } from 'crypto';
import 'reflect-metadata';
import { IPatientAppointmentRegistryProps } from '../../interfaces/registry';
import { PatientAppointmentRegistryDto, Registry } from './dto';

export class PatientAppointmentRegistryEntity extends PatientAppointmentRegistryDto {
  constructor(props: IPatientAppointmentRegistryProps) {
    super();
    Object.assign(this, props);
    this.id = props.id ?? randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.createdAt ?? null;
  }

  public get getId(): string {
    return this.id;
  }

  public get getRegistry(): Registry {
    return this.registry;
  }

  public set setRegistry(registry: Registry) {
    this.registry = registry;
  }

  public get getPsychologistId(): string {
    return this.psychologistId;
  }

  public set setPsychologistId(psychologistId: string) {
    this.psychologistId = psychologistId;
  }

  public get getPatientId(): string {
    return this.patientId;
  }

  public set setPatientId(patientId: string) {
    this.patientId = patientId;
  }

  public get getCreatedAt(): Date | null | undefined {
    return this.createdAt;
  }

  public set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  public get getUpdatedAt(): Date | null | undefined {
    return this.updatedAt;
  }

  public set setUpdatedAt(updatedAt: Date | null) {
    this.updatedAt = updatedAt;
  }
}
