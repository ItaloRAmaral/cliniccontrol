import { IsObject, IsString } from 'class-validator';
import { Registry } from '../../entities/registry/dto';

export class UpdatePatientAppointmentRegistryInputDto {
  @IsString()
  id!: string;

  @IsObject()
  registry!: Registry;
}
