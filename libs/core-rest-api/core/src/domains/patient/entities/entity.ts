/* eslint-disable @nx/enforce-module-boundaries */
import { randomUUID } from "crypto";
import { Replace } from "@clinicControl/core-rest-api/core/shared/utils";

import { IPatientProps } from "../interfaces/patient";

export class Patient {
  private props: IPatientProps;

  constructor(
    props: Replace<IPatientProps, { id?: string; createdAt?: Date }>
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

  public get getName(): string {
    return this.props.name;
  }

  public set setName(name: string) {
    this.props.name = name;
  }

  public get getEmail(): string {
    return this.props.email;
  }

  public set setEmail(email: string) {
    this.props.email = email;
  }

  public get getPassword(): string {
    return this.props.password;
  }

  public set setPassword(password: string) {
    this.props.password = password;
  }

  public get getCPF(): string {
    return this.props.CPF;
  }

  public set setCPF(CPF: string) {
    this.props.CPF = CPF;
  }

  public get getPhone(): number {
    return this.props.phone;
  }

  public set setPhone(phone: number) {
    this.props.phone = phone;
  }

  public get getPsychologistId(): string {
    return this.props.psychologistId;
  }

  public set setPsychologistId(psychologistId: string) {
    this.props.psychologistId = psychologistId;
  }

  public get getCreatedAt() {
    return this.props.createdAt;
  }

  public set setCreatedAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get getUpdatedAt() {
    return this.props.updatedAt;
  }

  public set setUpdatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}

// const patient = new Patient({ name: "teste", email: "", password: "", CPF: "", phone: 0 });

// console.log(patient);
