import { randomUUID } from 'crypto';
import { IClinicProps } from '../../interfaces/clinic';
import { ClinicDto } from './dto';

export class ClinicEntity extends ClinicDto {
  constructor(props: IClinicProps) {
    super();
    Object.assign(this, props);
    this.id = props.id ?? randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.adress = props.adress ?? null;
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

  public get getPsychologistId(): string {
    return this.psychologistId;
  }

  public set setPsychologistId(psychologistId: string) {
    this.psychologistId = psychologistId;
  }

  public get getAdress(): string | null | undefined {
    return this.adress;
  }

  public set setAdress(adress: string) {
    this.adress = adress;
  }

  public get getCity(): string {
    return this.city;
  }

  public set setCity(city: string) {
    this.city = city;
  }

  public get getState(): string {
    return this.state;
  }

  public set setState(state: string) {
    this.state = state;
  }

  public set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  public get getCreatedAt(): Date | null | undefined {
    return this.createdAt;
  }

  public get getUpdatedAt(): Date | null | undefined {
    return this.updatedAt;
  }

  public set setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }
}
