export interface IClinicProps {
  id: string;
  name: string;
  psychologistId: string;
  adress: string | null;
  city: string;
  state: string;
  createdAt: Date;
  updatedAt?: Date;
  // deletedAt?: Date;
}
