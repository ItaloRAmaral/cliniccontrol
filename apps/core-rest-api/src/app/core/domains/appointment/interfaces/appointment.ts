import { Replace } from '../../../../shared/utils';
import { AppointmentDto } from '../entities/appointment/dto';
import { CreateSingleAppointmentDto } from '../use-cases/create-single-appointment/create-single-appointment-dto';

export type IAppointmentProps = Replace<
  AppointmentDto,
  {
    id?: string;
    createdAt?: Date;
    done?: boolean | null;
    missed?: boolean | null;
    cancellationDate?: Date | null;
    paid?: boolean | null;
    date: string
  }
>;
export type ICreateAppointmentServiceProps = Replace<
  CreateSingleAppointmentDto,
  { createdAt?: Date }
>;
