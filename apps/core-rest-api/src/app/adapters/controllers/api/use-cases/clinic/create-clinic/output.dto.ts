import { IsString } from 'class-validator';

export class CreateClinicControllerOutputDto {
  @IsString()
  message!: string;
}
