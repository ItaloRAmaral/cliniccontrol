import { Replace } from "../../../shared/utils";
import { PatientDto } from "../entities/patient/dto";

export type IPatientProps = Replace<PatientDto, { id?: string; createdAt?: Date }>;
