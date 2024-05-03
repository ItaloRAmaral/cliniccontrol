import { IsDate, IsObject, IsString } from 'class-validator';

class UpdatedClinicInfoOutputDto {
  @IsString()
  name?: string;

  @IsString()
  psychologistId?: string;

  @IsString()
  address?: string | null;

  @IsString()
  city?: string;

  @IsString()
  state?: string;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date | null;
}

export class UpdateClinicControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject({ each: true })
  updatedClinic!: UpdatedClinicInfoOutputDto;
}
