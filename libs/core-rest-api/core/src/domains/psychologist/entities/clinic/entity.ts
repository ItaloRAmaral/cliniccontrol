/* eslint-disable @nx/enforce-module-boundaries */
import { randomUUID } from 'crypto';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils';
import { ClinicDto } from './dto';

// export class Clinic {
//   private props: IClinicProps;

//   constructor(props: Replace<IClinicProps, { id?: string; createdAt?: Date }>) {
//     this.props = {
//       ...props,
//       id: props.id ?? randomUUID(),
//       createdAt: props.createdAt ?? new Date()
//     };
//   }

//   public get getId(): string {
//     return this.props.id;
//   }

//   public get getName(): string {
//     return this.props.name;
//   }

//   public set setName(name: string) {
//     this.props.name = name;
//   }

//   public get getPsychologistId(): string {
//     return this.props.psychologistId;
//   }

//   public set setPsychologistId(psychologistId: string) {
//     this.props.psychologistId = psychologistId;
//   }

//   public get getAdress(): string | null {
//     return this.props.adress;
//   }

//   public set setAdress(adress: string) {
//     this.props.adress = adress;
//   }

//   public get getCity(): string {
//     return this.props.city;
//   }

//   public set setCity(city: string) {
//     this.props.city = city;
//   }

//   public get getState(): string {
//     return this.props.state;
//   }

//   public set setState(state: string) {
//     this.props.state = state;
//   }

//   public set setCreatedAt(createdAt: Date) {
//     this.props.createdAt = createdAt;
//   }

//   public get getCreatedAt(): Date {
//     return this.props.createdAt;
//   }

//   public get getUpdatedAt(): Date | null | undefined {
//     return this.props.updatedAt;
//   }

//   public set setUpdatedAt(updatedAt: Date) {
//     this.props.updatedAt = updatedAt;
//   }
// }

type IClinicProps = Replace<ClinicDto, { id?: string; createdAt?: Date }>;

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

// const clinic = new ClinicEntity({
//   name: 'Clinica teste',
//   psychologistId: '12E-341a',
//   adress: 'Endereço teste',
//   city: 'Cidade teste',
//   state: 'Estado teste',
// });

// console.log(clinic);
