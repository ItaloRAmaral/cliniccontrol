import { IsUUID } from 'class-validator';

export class UpdatePatientAppointmentRegistryParamsInputDto {
  @IsUUID()
  id!: string;
}
