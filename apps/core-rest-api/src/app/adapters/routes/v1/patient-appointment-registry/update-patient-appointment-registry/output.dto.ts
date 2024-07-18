import { IsObject, IsString } from 'class-validator';
import { PatientAppointmentRegistryEntity } from '../../../../../core/domains/patient-appointment-registry/entities/registry/entity';

class UpdatedPatientAppointmentRegistryInfoOutputDto extends PatientAppointmentRegistryEntity {}
export class UpdatePatientAppointmentRegistryControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject({ each: true })
  updatedPatientAppointmentRegistry!: UpdatedPatientAppointmentRegistryInfoOutputDto;
}
