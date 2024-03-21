import {
  Prisma,
  Plan as PrismaPlan,
  Psychologist as PrismaPsychologistDto,
  Role as PrismaRole,
} from '@prisma/client';
import { PsychologistEntity } from '../../../core/domains/psychologist/entities/psychologist/entity';
import { CreatePsychologistInputDto } from '../../../core/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { UpdatePsychologistInputDto } from '../../../core/domains/psychologist/use-cases/update-psychologist/update-psychologist-dto';
import { Plan, Role } from '../../../core/shared/interfaces/payments';

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

  static toPrismaCreate(raw: CreatePsychologistInputDto): Prisma.PsychologistCreateArgs {
    raw.role as unknown as PrismaRole;

    return {
      data: {
        ...raw,
        role: raw.role as unknown as PrismaRole,
        plan: raw.plan as unknown as PrismaPlan,
      },
    };
  }

  static toPrismaUpdate(raw: UpdatePsychologistInputDto): Prisma.PsychologistUpdateArgs {
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
