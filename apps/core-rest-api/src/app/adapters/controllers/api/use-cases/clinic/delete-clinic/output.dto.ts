import { IsObject, IsString } from 'class-validator';

export class DeleteClinicControllerOutputDto {
  @IsString()
  message!: string;

  @IsObject()
  data!: {
    clinic: {
      name: string;
    };
    deletedAt: Date;
  };
}
