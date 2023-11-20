import { IsString } from 'class-validator';

export class RouteParamsDto {
  @IsString()
  psychologistId!: string;

  @IsString()
  clinicName!: string;
}

interface Response {
  message: string;
  data: {
    clinic: {
      name: string;
    };
    deletedAt: Date;
  };
}

export type IControllerResponse = Response | Error;
