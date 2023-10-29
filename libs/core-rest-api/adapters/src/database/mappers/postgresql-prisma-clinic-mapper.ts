import { ClinicEntity } from '@clinicControl/core-rest-api/core/src/domains/clinic/entities/clinic/entity';
import { CreateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/create-clinic/create-clinic-dto';
import { UpdateClinicDto } from '@clinicControl/core-rest-api/core/src/domains/clinic/use-cases/update-clinic/update-clinic-dto';
import {
  Prisma,
  Clinic as PrismaClinicDto,
} from '@prisma/client';

export class PostgresqlPrismaClinicMapper {
  static toDomain(raw: PrismaClinicDto): ClinicEntity {
    return new ClinicEntity({
      ...raw,
    });
  }

  static toDomainMany(raw: PrismaClinicDto[]): ClinicEntity[] {
    return raw.map((clinic) => this.toDomain(clinic));
  }

  static toPrismaCreate(raw: CreateClinicDto): Prisma.ClinicCreateArgs {

    return {
      data: {
        ...raw,
        city: raw.city,
        name: raw.name,
        state: raw.state,
        updatedAt: new Date()
      }
        
    
    };
  }

  static toPrismaUpdate(raw: UpdateClinicDto): Prisma.ClinicUpdateArgs {
    return {
      data: {
        ...raw,
      },
      where: {
        id: raw.id,
      },
    };
  }
}
