import {
  IsString,
  IsMobilePhone,
  IsDate
} from 'class-validator';
// import { Type } from 'class-transformer';

export class patientDto {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  CPF!: string;

  @IsMobilePhone('pt-BR')
  phone!: number;

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;

  // @ValidateNested()
  // @Type(() => adressDto)
  // adress!: adressDto;

  // TODO: apointments
  // @ValidateNested()
  // @Type(() => apoimentsDto)
  // apointments!: apoimentsDto[];
}
