import { IsString } from 'class-validator';

export class DeleteClinicControllerOutputDto {
  @IsString()
  message!: string;
}
