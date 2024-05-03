import { Replace } from '../../../../shared/utils';
import { PatientDto } from '../entities/patient/dto';
import { CreatePatientInputDto } from '../use-cases/create-patient/create-patient-dto';

export type IPatientProps = Replace<PatientDto, { id?: string; createdAt?: Date }>;

export type ICreatePatientServiceProps = Replace<
  CreatePatientInputDto,
  { id?: string; createdAt?: Date }
>;
