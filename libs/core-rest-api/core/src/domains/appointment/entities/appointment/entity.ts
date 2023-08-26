/* eslint-disable @nx/enforce-module-boundaries */
import { randomUUID } from 'crypto';
import { IAppointmentProps } from '../../interfaces/appointment';
import { AppointmentDto } from './dto';

export class AppointmentEntity extends AppointmentDto {
  constructor(props: IAppointmentProps) {
    super();
    Object.assign(this, props);
    this.id = props.id ?? randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.done = props.done ?? false;
    this.missed = props.missed ?? null;
    this.cancellationDate = props.cancellationDate ?? null;
    this.paid = props.paid ?? false;
  }

  public get getId(): string {
    return this.id;
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

  public get getDate(): Date {
    return this.date;
  }

  public set setDate(date: Date) {
    this.date = date;
  }

  public get getOnline(): boolean {
    return this.online;
  }

  public set setOnline(online: boolean) {
    this.online = online;
  }

  public get getClinicId(): string {
    return this.clinicId;
  }

  public set setClinicId(clinicId: string) {
    this.clinicId = clinicId;
  }

  public get getConfirmed(): boolean {
    return this.confirmed;
  }

  public set setConfirmed(confirmed: boolean) {
    this.confirmed = confirmed;
  }

  public get getConfirmationDate(): Date | null | undefined {
    return this.confirmationDate;
  }

  public set setConfirmationDate(confirmationDate: Date) {
    this.confirmationDate = confirmationDate;
  }

  public get getCancelled(): boolean {
    return this.cancelled;
  }

  public set setCancelled(cancelled: boolean) {
    this.cancelled = cancelled;
  }

  public get getCancellationDate(): Date | null | undefined {
    return this.cancellationDate;
  }

  public set setCancellationDate(cancellationDate: Date) {
    this.cancellationDate = cancellationDate;
  }

  public get getDone(): boolean | null {
    return this.done;
  }

  public set setDone(done: boolean | null) {
    this.done = done;
  }

  public get getMissed(): boolean | null | undefined {
    return this.missed;
  }

  public set setMissed(missed: boolean) {
    this.missed = missed;
  }

  public get getPaid(): boolean | null | undefined {
    return this.paid;
  }

  public set setPaid(paid: boolean) {
    this.paid = paid;
  }

  public get getPaymentMethod(): string {
    return this.paymentMethod;
  }

  public set setPaymentMethod(paymentMethod: string) {
    this.paymentMethod = paymentMethod;
  }

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date | null | undefined {
    return this.updatedAt;
  }

  public set setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }
}
