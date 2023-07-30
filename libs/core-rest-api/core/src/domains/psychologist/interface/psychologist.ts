export interface IPsychologistProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  price: number;
  totalYearEarnings?: number
  totalMonthEarnings?: number;
  createdAt?: Date;
  updatedAt?: Date;
  // patients: PatientDto[];
  // apointments: ApoimentDto[];
}
