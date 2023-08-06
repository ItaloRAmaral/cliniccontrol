/* eslint-disable @nx/enforce-module-boundaries */
import { randomUUID } from 'crypto';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils';
import { IAppointmentProps } from '../../interfaces/appointment';


export class Appointment {
  private props: IAppointmentProps;

  constructor(
    props: Replace<IAppointmentProps, { id?: string; createdAt?: Date }>
  ) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get getId(): string {
    return this.props.id;
  }

  public get getPsychologistId(): string {
    return this.props.psychologistId;
  }

  public set setPsychologistId(psychologistId: string) {
    this.props.psychologistId = psychologistId;
  }

  public get getPatientId(): string {
    return this.props.patientId;
  }

  public set setPatientId(patientId: string) {
    this.props.patientId = patientId;
  }

  public get getDate(): Date {
    return this.props.date;
  }

  public set setDate(date: Date) {
    this.props.date = date;
  }

  public get getOnline(): boolean {
    return this.props.online;
  }

  public set setOnline(online: boolean) {
    this.props.online = online;
  }

  public get getConfirmed(): boolean {
    return this.props.confirmed;
  }

  public set setConfirmed(confirmed: boolean) {
    this.props.confirmed = confirmed;
  }

  public get getConfirmationDate(): Date | null {
    return this.props.confirmationDate;
  }

  public set setConfirmationDate(confirmationDate: Date) {
    this.props.confirmationDate = confirmationDate;
  }

  public get getCancelled(): boolean {
    return this.props.cancelled;
  }

  public set setCancelled(cancelled: boolean) {
    this.props.cancelled = cancelled;
  }

  public get getCancellationDate(): Date | null {
    return this.props.cancellationDate;
  }

  public set setCancellationDate(cancellationDate: Date) {
    this.props.cancellationDate = cancellationDate;
  }

  public get getDone(): boolean | null {
    return this.props.done;
  }

  public set setDone(done: boolean | null) {
    this.props.done = done;
  }

  public get getMissed(): boolean | null {
    return this.props.missed;
  }

  public set setMissed(missed: boolean) {
    this.props.missed = missed;
  }

  public get getPaid(): boolean {
    return this.props.paid;
  }

  public set setPaid(paid: boolean) {
    this.props.paid = paid;
  }

  public get getPaymentMethod(): string {
    return this.props.paymentMethod;
  }

  public set setPaymentMethod(paymentMethod: string) {
    this.props.paymentMethod = paymentMethod;
  }

  public get getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public get getUpdatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public set setUpdatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}

const appointment = new Appointment({
  patientId: '1',
  psychologistId: '1',
  date: new Date(),
  online: true,
  confirmed: true,
  confirmationDate: new Date(),
  cancelled: true,
  cancellationDate: new Date(),
  done: true,
  missed: true,
  paid: true,
  paymentMethod: 'teste',
});

console.log(appointment);
