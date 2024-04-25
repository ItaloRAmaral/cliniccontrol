import { IsString } from 'class-validator';

export class ControllerBodyInputDto {
  @IsString()
  email!: string;

  @IsString()
  password!: string;
}
