import { IsString } from 'class-validator';

export class DeletePatientControllerOutputDto {
  @IsString()
  message!: string;
}
