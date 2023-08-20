import { Replace } from "../../../shared/utils";
import { AppointmentDto } from "../entities/appointment/dto";


export type IAppointmentProps = Replace<AppointmentDto, { id?: string; createdAt?: Date }>;
