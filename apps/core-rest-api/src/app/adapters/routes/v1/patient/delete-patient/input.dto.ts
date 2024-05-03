import { IsString } from 'class-validator';

export class DeletePatientControllerParamsInputDto {
  @IsString()
  id!: string;
}
