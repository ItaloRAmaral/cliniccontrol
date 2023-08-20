import { Replace } from "../../../shared/utils";
import { ClinicDto } from "../entities/clinic/dto";
import { CreateClinicDto } from "../use-cases/create-clinic/create-clinic-dto";

export type IClinicProps = Replace<ClinicDto, { id?: string; createdAt?: Date }>;

export type ICreateClinicServiceProps = Replace<CreateClinicDto, { createdAt?: Date }>;
