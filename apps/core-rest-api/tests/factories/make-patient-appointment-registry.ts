import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';

import { PostgreSqlPrismaOrmService } from '../../src/app/adapters/database/infra/prisma/prisma.service';
import { PatientAppointmentRegistryEntity } from '../../src/app/core/domains/patient-appointment-registry/entities/registry/entity';
import { CreatePatientAppointmentRegistryDto } from '../../src/app/core/domains/patient-appointment-registry/use-cases/create-appointment-registry/create-appointment-registry-dto';

export function makePatientAppointmentRegistry(
  override: Partial<CreatePatientAppointmentRegistryDto> = {},
): PatientAppointmentRegistryEntity {
  const newAppointment = new PatientAppointmentRegistryEntity({
    psychologistId: faker.string.uuid(),
    patientId: faker.string.uuid(),
    registry: {
      observations: faker.lorem.paragraph(),
    },
    ...override,
  });

  return newAppointment;
}

@Injectable()
export class PatientAppointmentRegistryFactory {
  constructor(private postgreSqlPrismaOrmService: PostgreSqlPrismaOrmService) {}

  async makePrismaPatientAppointmentRegistry(
    patientAppointmentRegistry: Partial<CreatePatientAppointmentRegistryDto> = {},
  ): Promise<PatientAppointmentRegistryEntity> {
    const newPrismaPatientAppointmentRegistry = makePatientAppointmentRegistry(
      patientAppointmentRegistry,
    );

    await this.postgreSqlPrismaOrmService['patientAppointmentRegistry'].create({
      data: {
        id: newPrismaPatientAppointmentRegistry.id,
        patientId: newPrismaPatientAppointmentRegistry.patientId,
        psychologistId: newPrismaPatientAppointmentRegistry.psychologistId,
        registry: {
          observations: newPrismaPatientAppointmentRegistry.registry.observations,
        },
      },
    });

    return newPrismaPatientAppointmentRegistry;
  }
}
