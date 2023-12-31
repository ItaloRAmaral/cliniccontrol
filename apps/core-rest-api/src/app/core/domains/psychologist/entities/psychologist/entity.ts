import { randomUUID } from 'crypto';
import { Plan, Role } from '../../../../shared/interfaces/payments';
import { IPsychologistProps } from '../../interfaces/psychologist';
import { PsychologistDto } from './dto';

export class PsychologistEntity extends PsychologistDto {
  constructor(props: IPsychologistProps) {
    super();
    Object.assign(this, props);
    this.id = props.id ?? randomUUID();
    this.createdAt = props.createdAt ?? new Date();
    this.price = props.price ?? null;
    this.totalYearEarnings = props.totalYearEarnings ?? null;
    this.totalMonthEarnings = props.totalMonthEarnings ?? null;
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

  public get getRole(): Role {
    return this.role;
  }

  public set setRole(role: Role) {
    this.role = role;
  }

  public get getPrice(): number | null | undefined {
    return this.price;
  }

  public set setPrice(price: number) {
    this.price = price;
  }

  public get getPlan(): Plan {
    return this.plan;
  }

  public set setPlan(plan: Plan) {
    this.plan = plan;
  }

  public get getTotalYearEarnings(): number | null | undefined {
    return this.totalYearEarnings;
  }

  public set setTotalYearEarnings(totalYearEarnings: number) {
    this.totalYearEarnings = totalYearEarnings;
  }

  public get getTotalMonthEarnings(): number | null | undefined {
    return this.totalMonthEarnings;
  }

  public set setTotalMonthEarnings(totalMonthEarnings: number) {
    this.totalMonthEarnings = totalMonthEarnings;
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
