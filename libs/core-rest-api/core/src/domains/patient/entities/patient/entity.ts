import { randomUUID } from 'crypto';
import 'reflect-metadata';
import { PaymentMethod } from '../../../../shared/interfaces/payments';
import { IPatientProps } from '../../interfaces/patient';
import { PatientDto } from './dto';

export class PatientEntity extends PatientDto {
  constructor(props: IPatientProps) {
    super();
    Object.assign(this, props);
    this.id = props.id ?? randomUUID();
    this.createdAt = props.createdAt ?? new Date();
  }

  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public get getEmail(): string {
    return this.email;
  }

  public set setEmail(email: string) {
    this.email = email;
  }

  public get getCPF(): string {
    return this.CPF;
  }

  public set setCPF(CPF: string) {
    this.CPF = CPF;
  }

  public get getPhone(): string {
    return this.phone;
  }

  public set setPhone(phone: string) {
    this.phone = phone;
  }

  public get getPaymentMethod(): string {
    return this.paymentMethod;
  }

  public set setPaymentMethod(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  public get getClinicId(): string {
    return this.clinicId;
  }

  public set setClinicId(clinicId: string) {
    this.clinicId = clinicId;
  }

  public get getPsychologistId(): string {
    return this.psychologistId;
  }

  public set setPsychologistId(psychologistId: string) {
    this.psychologistId = psychologistId;
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

  public set setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }
}
