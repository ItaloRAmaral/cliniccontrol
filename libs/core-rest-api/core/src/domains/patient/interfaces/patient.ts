export interface IPatientProps {
  id: string
  name: string
  email: string
  password: string
  CPF: string
  phone: number
  psychologistId: string
  createdAt?: Date
  updatedAt?: Date
  // adress: adressDto
  // apointments: apoimentsDto[]
}
