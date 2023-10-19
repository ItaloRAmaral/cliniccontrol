import { PsychologistEntity } from '@clinicControl/core-rest-api/core/src/domains/psychologist/entities/psychologist/entity';
import { CreatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { UpdatePsychologistDto } from '@clinicControl/core-rest-api/core/src/domains/psychologist/use-cases/update-psychologist/update-psychologist-dto';
import {
  Plan,
  Role,
} from '@clinicControl/core-rest-api/core/src/shared/interfaces/payments';
import {
  Prisma,
  Plan as PrismaPlan,
  Psychologist as PrismaPsychologistDto,
  Role as PrismaRole,
} from '@prisma/client';

export class PostgresqlPrismaPsychologistMapper {
  static toDomain(raw: PrismaPsychologistDto): PsychologistEntity {
    return new PsychologistEntity({
      ...raw,
      role: raw.role as unknown as Role,
      plan: raw.plan as unknown as Plan,
    });
  }

  static toDomainMany(raw: PrismaPsychologistDto[]): PsychologistEntity[] {
    return raw.map((psychologist) => this.toDomain(psychologist));
  }

  static toPrismaCreate(raw: CreatePsychologistDto): Prisma.PsychologistCreateArgs {
    raw.role as unknown as PrismaRole;

    return {
      data: {
        ...raw,
        role: raw.role as unknown as PrismaRole,
        plan: raw.plan as unknown as PrismaPlan,
      },
    };
  }

  static toPrismaUpdate(raw: UpdatePsychologistDto): Prisma.PsychologistUpdateArgs {
    return {
      data: {
        ...raw,
        role: raw.role as unknown as PrismaRole,
        plan: raw.plan as unknown as PrismaPlan,
      },
      where: {
        id: raw.id,
      },
    };
  }
}
