import { IsString } from 'class-validator';

export class DeleteClinicControllerParamsInputDto {
  @IsString()
  id!: string;
}
