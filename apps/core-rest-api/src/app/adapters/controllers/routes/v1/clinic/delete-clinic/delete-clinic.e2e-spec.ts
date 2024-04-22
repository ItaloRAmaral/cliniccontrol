import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { setupE2ETest } from '../../../../../../../../tests/utils/e2e-tests-initial-setup';
import { ClinicEntity } from '../../../../../../core/domains/clinic/entities/clinic/entity';
import { PostgreSqlPrismaOrmService } from '../../../../../database/infra/prisma/prisma.service';

describe('[E2E] - Delete Clinic', () => {
  let prisma: PostgreSqlPrismaOrmService;
  let app: INestApplication;

  let access_token: string;
  let invalid_access_token: string;
  let clinic: ClinicEntity;

  beforeAll(async () => {
    const setup = await setupE2ETest();
    prisma = setup.prisma;
    app = setup.app;

    access_token = setup.access_token;
    invalid_access_token = setup.invalid_access_token;
    clinic = setup.clinic;
  });

  it('[DELETE] - Should return an error when trying to delete a clinic without access_token', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/clinic/${clinic.id}/delete`,
    );

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should return an error when trying to delete a clinic with invalid access_token', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/clinic/${clinic.id}/delete`)
      .set('Authorization', `Bearer ${invalid_access_token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid JWT token');
  });

  it('[DELETE] - Should throw an error if route param is not an valid id', async () => {
    const wrongId = faker.string.uuid();

    const response = await request(app.getHttpServer())
      .delete(`/clinic/${wrongId}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('clinic not found');
  });

  it('[DELETE] - Should successfully delete a clinic', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/clinic/${clinic.id}/delete`)
      .set('Authorization', `Bearer ${access_token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Clinic deleted successfully');

    const deletedClinic = await prisma['clinic'].findUnique({
      where: { id: clinic.id },
    });
    expect(deletedClinic).toBeNull();
  });
});
