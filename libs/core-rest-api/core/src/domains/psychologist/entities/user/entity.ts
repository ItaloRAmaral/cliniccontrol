/* eslint-disable @nx/enforce-module-boundaries */
import { randomUUID } from 'crypto';
import { PsychologistDto } from './dto';
import { Replace } from '@clinicControl/core-rest-api/core/shared/utils';

type psychologistProps = Replace<PsychologistDto, {id?: string, createdAt?: Date}>

export class Psychologist extends PsychologistDto {
  constructor(props: psychologistProps) {
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

  public get getPassword(): string {
    return this.password;
  }

  public set setPassword(password: string) {
    this.password = password;
  }

  public get getRole(): string {
    return this.role;
  }

  public set setRole(role: string) {
    this.role = role;
  }

  public get getPrice() {
    return this.price;
  }

  public set setPrice(price: number) {
    this.price = price;
  }

  public get getTotalYearEarnings() {
    return this.totalYearEarnings;
  }

  public set setTotalYearEarnings(totalYearEarnings: number) {
    this.totalYearEarnings = totalYearEarnings;
  }

  public get getTotalMonthEarnings() {
    return this.totalMonthEarnings;
  }

  public set setTotalMonthEarnings(totalMonthEarnings: number) {
    this.totalMonthEarnings = totalMonthEarnings;
  }

  public get getCreatedAt() {
    return this.createdAt;
  }

  public set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  public get getUpdatedAt() {
    return this.updatedAt;
  }

  public set setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }
}
