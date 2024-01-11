import { IsObject, IsString } from 'class-validator';
import { Registry } from '../../entities/registry/dto';

export class UpdatePatientAppointmentRegistryDto {
  @IsString()
  id!: string;

  @IsObject()
  registry!: Registry;
}
