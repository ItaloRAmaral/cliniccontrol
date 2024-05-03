import { IsString } from 'class-validator';

export class DeletePatientInputDto {
  @IsString()
  id!: string;

  @IsString()
  psychologistId!: string;
}
