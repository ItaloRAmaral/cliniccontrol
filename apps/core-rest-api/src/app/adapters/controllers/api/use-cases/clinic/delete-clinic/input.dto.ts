import { IsString } from 'class-validator';

export class DeleteClinicControllerInputDto {
  @IsString()
  clinicId!: string;
}
