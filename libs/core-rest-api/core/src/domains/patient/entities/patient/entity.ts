/* eslint-disable @nx/enforce-module-boundaries */
import 'reflect-metadata';
import { randomUUID } from "crypto";
import { Replace } from "@clinicControl/core-rest-api/core/shared/utils";
import { PatientDto } from "./dto";

type IPatientProps = Replace<
  PatientDto,
  { id?: string; createdAt?: Date; }
>;

export class PatientEntity extends PatientDto {
  constructor(props: IPatientProps) {
    super()
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

  public get getPhone(): number {
    return this.phone;
  }

  public set setPhone(phone: number) {
    this.phone = phone;
  }

  public get getPaymentMethod(): string {
    return this.paymentMethod;
  }

  public set setPaymentMethod(paymentMethod: string) {
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

// const patient = new Patient({
//   name: "teste",
//   email: "",
//   CPF: "",
//   phone: 0,
//   paymentMethod: "",
//   psychologistId: "",
//   clinicId: "",
// });

// console.log(patient);

