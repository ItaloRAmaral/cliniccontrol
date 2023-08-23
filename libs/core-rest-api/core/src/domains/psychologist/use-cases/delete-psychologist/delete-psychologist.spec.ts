import { faker } from '@faker-js/faker'
import { ConflictException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { InMemoryPsychologistDatabaseRepository } from '../../repositories/database-in-memory-repository'
import { PsychologistDatabaseRepository } from '../../repositories/database-repository'
import { DeletePsychologistService } from './delete-psychologist.service'

describe('[psychologist] Delete Psychologist Service', () => {
  const fakePsychologist = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    role: faker.person.jobTitle(),
    price: faker.number.int({ min: 0, max: 1000 }),
    plan: 'premium',
  };

  let service: DeletePsychologistService
  let databaseRepository: PsychologistDatabaseRepository

  beforeEach(async () => {
    const module : TestingModule = await Test.createTestingModule({
      providers: [
        DeletePsychologistService,
        {
          provide: PsychologistDatabaseRepository,
          useClass: InMemoryPsychologistDatabaseRepository
        }
      ]
    }).compile()

    service = module.get<DeletePsychologistService>(DeletePsychologistService);
    databaseRepository = module.get<PsychologistDatabaseRepository>(PsychologistDatabaseRepository)
  })

  it('should delete a new psychologist', async () => {
    const createPsychologist = await databaseRepository.createPsychologist(fakePsychologist)
    await service.execute(createPsychologist.email)
    const getPsychologists = await databaseRepository.getPsychologists()

    expect(getPsychologists).not.toContain(createPsychologist)
  });

  it('should throw error if psychologist does not exist', async () => {
    await expect(service.execute(fakePsychologist.email)).rejects.toThrow(ConflictException)
  })
})