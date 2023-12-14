// import { fakerPT_BR as faker } from '@faker-js/faker';
// import { ConflictException } from '@nestjs/common';

// import { PaymentMethod, Plan, Role } from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
// import { randomUUID } from 'crypto';
// import { PSYCHOLOGIST_ERROR_MESSAGES } from '../../../../shared/errors/error-messages';
// import { InMemoryClinicDatabaseRepository } from '../../../clinic/repositories/database-in-memory-repository';
// import { InMemoryPatientDatabaseRepository } from '../../../patient/repositories/database-in-memory-repository';
// import { CreatePatientDto } from '../../../patient/use-cases/create-patient/create-patient-dto';
// import { InMemoryPsychologistDatabaseRepository } from '../../../psychologist/repositories/database-in-memory-repository';
// import { InMemoryPatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-in-memory-repository';
// import { PatientAppointmentRegistryDatabaseRepository } from '../../repositories/database-repository';
// import { CreatePatientAppointmentRegistryDto } from './create-appointment-registry-dto';
// import { CreatePatientAppointmentRegistryService } from './create-appointment-registry.service';

// describe('[patient appointment registry] Create Patient Appointment Registry Service', async () => {
//   const patientDatabaseRepository = new InMemoryPatientDatabaseRepository()
//   const clinicDatabaseRepository = new InMemoryClinicDatabaseRepository();
//   const psychologistDatabaseRepository = new InMemoryPsychologistDatabaseRepository(clinicDatabaseRepository)

//   const fakePsychologist = {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     password: faker.internet.password({ length: 8 }),
//     role: Role.PSYCHOLOGIST,
//     plan: Plan.PREMIUM
//   }

//   const psychologist = await psychologistDatabaseRepository.createPsychologist(fakePsychologist)

//   const fakePatient: CreatePatientDto = {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     CPF: faker.number.int({ min: 0, max: 10000000000 }).toString(),
//     phone: '+55 11 911111111',
//     paymentMethod: PaymentMethod.CREDIT_CARD,
//     psychologistId: randomUUID(),
//     clinicId: randomUUID(),
//   };

//   const patient = await patientDatabaseRepository.createPatient(fakePatient)

//   const fakePatientAppointmentRegistry: CreatePatientAppointmentRegistryDto = {
//     registry: faker.helpers.objectEntry({obs: 'observations'}),
//     patientId: patient.id,
//     psychologistId: psychologist.id
//   };

//   let service: CreatePatientAppointmentRegistryService;
//   let databaseRepository: PatientAppointmentRegistryDatabaseRepository;

//   beforeAll(async () => {
//     databaseRepository = new InMemoryPatientAppointmentRegistryDatabaseRepository(patientDatabaseRepository);
//     service = new CreatePatientAppointmentRegistryService(databaseRepository);
//   });

//   it('should create a new psychologist', async () => {
//     const psychologist = await service.execute(fakePsychologist);

//     const psychologistDatabaseRepository =
//       await databaseRepository.findPsychologistByEmail(psychologist.email);

//     expect(psychologistDatabaseRepository?.email).toEqual(psychologist.email);
//     expect(psychologist.email).toEqual(fakePsychologist.email);
//     expect(psychologist.name).toEqual(fakePsychologist.name);
//   });

//   it('should throw conflict exception if email already exists', async () => {
//     await service.execute(fakePsychologist);

//     await expect(service.execute(fakePsychologist)).rejects.toThrow(
//       new ConflictException(PSYCHOLOGIST_ERROR_MESSAGES['PSYCHOLOGIST_ALREADY_EXISTS'])
//     );
//   });
// });
