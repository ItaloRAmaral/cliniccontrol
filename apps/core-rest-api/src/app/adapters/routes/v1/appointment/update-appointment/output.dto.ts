import { IsObject, IsString } from 'class-validator';
import { AppointmentEntity } from '../../../../../core/domains/appointment/entities/appointment/entity';

class UpdatedAppointmentInfoOutputDto extends AppointmentEntity{}

export class UpdateAppointmentControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject({ each: true })
  updatedApointment!: UpdatedAppointmentInfoOutputDto
}
