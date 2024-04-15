import { randomUUID } from 'crypto';
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
}
