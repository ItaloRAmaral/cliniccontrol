export interface IAppointmentProps {
  id: string;
  patientId: string;
  psychologistId: string;
  date: Date;
  online: boolean;
  confirmed: boolean;
  confirmationDate: Date | null;
  cancelled: boolean;
  cancellationDate: Date | null;
  done: boolean | null;
  missed: boolean | null;
  paid: boolean;
  paymentMethod: string;
  createdAt: Date;
  updatedAt?: Date | null;
}
