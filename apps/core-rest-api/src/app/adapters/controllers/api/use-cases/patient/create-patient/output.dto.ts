import { IsString } from 'class-validator';

export class CreatePatientControllerOutputDto {
  @IsString()
  message!: string;
}
