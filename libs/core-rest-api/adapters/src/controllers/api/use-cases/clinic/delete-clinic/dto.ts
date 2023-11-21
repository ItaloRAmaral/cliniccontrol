import { IsString } from 'class-validator';

export class RouteParamsDto {
  @IsString()
  clinicId!: string;
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
