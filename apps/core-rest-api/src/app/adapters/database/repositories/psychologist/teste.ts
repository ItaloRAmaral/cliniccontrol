import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PsychologistEntity } from '../../../../core/domains/psychologist/entities/psychologist/entity';
import { PsychologistDatabaseRepository } from '../../../../core/domains/psychologist/repositories/database-repository';
import { CreatePsychologistDto } from '../../../../core/domains/psychologist/use-cases/create-psychologist/create-psychologist-dto';
import { DeletedPsychologistInfo } from '../../../../core/domains/psychologist/use-cases/delete-psychologist/dto';
import { UpdatePsychologistDto } from '../../../../core/domains/psychologist/use-cases/update-psychologist/update-psychologist-dto';
import { Psychologist } from '../../infra/typeorm/entities/psychologist.entitie';

// const dataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'cliniccontrol',
//   password: 'cliniccontrolpassword',
//   database: 'core-rest-api',
//   entities: ['../../infra/typeorm/entities/*.ts'],
//   synchronize: false,
// });

@Injectable()
export class PostgresTypeOrmRepository extends PsychologistDatabaseRepository {
  constructor(
    @InjectRepository(Psychologist)
    private psychologistRepository: Repository<Psychologist>,
  ) {
    super();
  }

  async createPsychologist(
    psychologist: CreatePsychologistDto,
  ): Promise<PsychologistEntity> {
    const newPsychologist = this.psychologistRepository.create(psychologist);
    await this.psychologistRepository.save(newPsychologist);
    return newPsychologist as unknown as PsychologistEntity;
  }
  override findPsychologistByEmail(email: string): Promise<PsychologistEntity | null> {
    const psychologist = this.psychologistRepository.findOne({ where: { email } });
    return psychologist as unknown as Promise<PsychologistEntity | null>;
  }
  async findPsychologistById(id: string): Promise<PsychologistEntity | null> {
    const psychologist = this.psychologistRepository.findOne({ where: { id } });
    return psychologist as unknown as Promise<PsychologistEntity | null>;
  }
  async getPsychologists(): Promise<PsychologistEntity[]> {
    const psychologists = await this.psychologistRepository.find();
    return psychologists as unknown as PsychologistEntity[];
  }
  async updatePsychologist(newPsychologist: UpdatePsychologistDto): Promise<void> {
    await this.psychologistRepository.update(newPsychologist.id, newPsychologist);
  }
  async deletePsychologist(email: string): Promise<DeletedPsychologistInfo> {
    const psychologist = await this.psychologistRepository.findOne({ where: { email } });
    await this.psychologistRepository.delete({ email });

    return psychologist as unknown as DeletedPsychologistInfo;
  }

  async getDataSource() {
    const teste = await this.psychologistRepository.manager.exists(Psychologist);
    return teste;
  }
}
