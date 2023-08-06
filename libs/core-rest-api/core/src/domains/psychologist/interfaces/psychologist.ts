/* eslint-disable @nx/enforce-module-boundaries */
export interface IPsychologistProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  price?: number | null;
  plan: string | null;
  totalYearEarnings?: number | null;
  totalMonthEarnings?: number | null;
  createdAt: Date;
  updatedAt?: Date | null;
  // patients: PatientDto[];
  // apointments: ApoimentDto[];
}
