/* eslint-disable @nx/enforce-module-boundaries */
import { randomUUID } from 'crypto';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils';
import { IPsychologistProps } from '../../interface/psychologist';

export class Psychologist {
  private props: IPsychologistProps;

  constructor(
    props: Replace<IPsychologistProps, { id?: string; createdAt?: Date }>
  ) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      createdAt: props.createdAt ?? new Date(),
    };
  }
  // constructor(props: psychologistProps) {
  //   super();
  //   Object.assign(this, props);
  //   this.id = props.id ?? randomUUID();
  //   this.createdAt = props.createdAt ?? new Date();
  // }

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

  public get getRole(): string {
    return this.props.role;
  }

  public set setRole(role: string) {
    this.props.role = role;
  }

  public get getPrice(): number | null | undefined {
    return this.props.price;
  }

  public set setPrice(price: number) {
    this.props.price = price;
  }

  public get getPlan(): string | null | undefined {
    return this.props.plan;
  }

  public set setPlan(plan: string) {
    this.props.plan = plan;
  }

  public get getTotalYearEarnings(): number | null | undefined {
    return this.props.totalYearEarnings;
  }

  public set setTotalYearEarnings(totalYearEarnings: number) {
    this.props.totalYearEarnings = totalYearEarnings;
  }

  public get getTotalMonthEarnings(): number | null | undefined {
    return this.props.totalMonthEarnings;
  }

  public set setTotalMonthEarnings(totalMonthEarnings: number) {
    this.props.totalMonthEarnings = totalMonthEarnings;
  }

  public get getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public set setCreatedAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get getUpdatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }

  public set setUpdatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }
}

const psychologist = new Psychologist({
  name: 'teste',
  email: 'teste',
  password: 'teste',
  role: 'teste',
  price: 1,
});

psychologist.setTotalMonthEarnings = 1;

console.log(psychologist);
