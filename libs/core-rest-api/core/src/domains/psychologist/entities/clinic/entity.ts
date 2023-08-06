/* eslint-disable @nx/enforce-module-boundaries */
import { randomUUID } from 'crypto';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils';
import { IClinicProps } from '../../interfaces/clinic';

export class Clinic {
  private props: IClinicProps;

  constructor(props: Replace<IClinicProps, { id?: string; createdAt?: Date }>) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date()
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

  public get getPsychologistId(): string {
    return this.props.psychologistId;
  }

  public set setPsychologistId(psychologistId: string) {
    this.props.psychologistId = psychologistId;
  }

  public get getAdress(): string | null {
    return this.props.adress;
  }

  public set setAdress(adress: string) {
    this.props.adress = adress;
  }

  public get getCity(): string {
    return this.props.city;
  }

  public set setCity(city: string) {
    this.props.city = city;
  }

  public get getState(): string {
    return this.props.state;
  }

  public set setState(state: string) {
    this.props.state = state;
  }

  public set setCreatedAt(createdAt: Date) {
    this.props.createdAt = createdAt;
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

const clinic = new Clinic({
  name: 'teste',
  psychologistId: 'teste',
  adress: 'teste',
  city: 'teste',
  state: 'teste'
});

console.log(clinic);
