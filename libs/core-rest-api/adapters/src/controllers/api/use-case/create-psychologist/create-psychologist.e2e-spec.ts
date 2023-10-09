import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { PostgreSqlPrismaOrmService } from '../../../../database/infra/prisma/prisma.service';
import { ApiModule } from '../../api.module';

describe('[E2E] - Create Psychologist Account', () => {
  let app: INestApplication;
  let prisma: PostgreSqlPrismaOrmService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PostgreSqlPrismaOrmService);

    await app.init();
  });

  it('[POST] - Should successfully create a new psychologist', async () => {
    const response = await request(app.getHttpServer())
      .post('/psychologist/create')
      .set('api-key', 'api-key')
      .send({
        name: 'Novo Usuário Teste',
        email: 'novo_usuario_teste@gmail.com',
        password: '01212012',
        role: 'PSYCHOLOGIST',
        plan: 'PREMIUM',
      });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.psychologist.findUnique({
      where: {
        email: 'novo_usuario_teste@gmail.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();
  });

  it('[POST] - Should return an error when trying to create a new psychologist without api-key', async () => {
    const response = await request(app.getHttpServer())
      .post('/psychologist/create')
      .send({
        name: 'Novo Usuário Teste',
        email: 'novo_usuario_teste_not_created@gmail.com',
        password: '01212012',
        role: 'PSYCHOLOGIST',
        plan: 'PREMIUM',
      });

    expect(response.statusCode).toBe(401);

    const userOnDatabase = await prisma.psychologist.findUnique({
      where: {
        email: 'novo_usuario_teste_not_created@gmail.com',
      },
    });

    expect(userOnDatabase).toBeFalsy();
    expect(response.body.message).toBe('API key is missing');
  });

  it('[POST] - Should return an error when trying to create a new psychologist that already exists', async () => {
    const response = await request(app.getHttpServer())
      .post('/psychologist/create')
      .set('api-key', 'api-key')
      .send({
        name: 'Novo Usuário Teste',
        email: 'novo_usuario_teste_new_entrie@gmail.com',
        password: '01212012',
        role: 'PSYCHOLOGIST',
        plan: 'PREMIUM',
      });

    expect(response.statusCode).toBe(201);

    const userOnDatabase = await prisma.psychologist.findUnique({
      where: {
        email: 'novo_usuario_teste_new_entrie@gmail.com',
      },
    });

    expect(userOnDatabase).toBeTruthy();

    const response_new_post = await request(app.getHttpServer())
      .post('/psychologist/create')
      .set('api-key', 'api-key')
      .send({
        name: 'Novo Usuário Teste',
        email: 'novo_usuario_teste_new_entrie@gmail.com',
        password: '01212012',
        role: 'PSYCHOLOGIST',
        plan: 'PREMIUM',
      });

    expect(response_new_post.statusCode).toBe(409);
    expect(response_new_post.body.message).toBe('psychologist already exists');
  });
});
