export interface IPatientProps {
  id: string
  name: string
  email: string
  CPF: string
  phone: number
  paymentMethod: string
  psychologistId: string
  clinicId: string
  createdAt: Date
  updatedAt?: Date
  // deletedAt?: Date
  // apointments: apoimentsDto[]
}
