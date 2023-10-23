import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { CreateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import {
  Plan,
  Role,
} from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
import {
  Prisma,
  Clinic as PrismaClinicDto,
} from '@prisma/client';

export class PostgresqlPrismaClinicMapper {
  static toDomain(raw: PrismaClinicDto): ClinicEntity {
    return new ClinicEntity({
      ...raw,
      role: raw.role as unknown as Role,
      plan: raw.plan as unknown as Plan,
    });
  }

  static toDomainMany(raw: PrismaClinicDto[]): ClinicEntity[] {
    return raw.map((psychologist) => this.toDomain(psychologist));
  }

  static toPrismaCreate(raw: CreateClinicDto): Prisma.ClinicCreateArgs {

    return {
      data: {
        ...raw,
      },
    };
  }

  static toPrismaUpdate(raw: UpdateClinicDto): Prisma.ClinicUpdateArgs {
    return {
      data: {
        ...raw,
        // role: raw.role as unknown as PrismaRole,
        // plan: raw.plan as unknown as PrismaPlan,
      },
      where: {
        id: raw.id,
      },
    };
  }
}
