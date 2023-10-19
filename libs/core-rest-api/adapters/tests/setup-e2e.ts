/*
  Como o arquivo de setup é uma dependência do vitest, não conseguiremos usar o env.ts para configurar as variáveis de ambiente.
  Então instalamos o dotenv como dev dependencies
*/

import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env['DATABASE_URL']) {
    throw new Error('Please provider a DATABASE_URL environment variable');
  }

  console.log('setting up test e2e url database...');

  const url = new URL(process.env['DATABASE_URL']);

  console.log('url', process.env['DATABASE_URL']);
  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId);

  process.env['DATABASE_URL'] = databaseURL;

  console.log('databaseURL', databaseURL);
  console.log('connecting test e2e database...');
  execSync(
    'pnpm prisma migrate deploy --schema=./libs/core-rest-api/adapters/src/database/infra/prisma/postgresql.schema.prisma'
  );
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await prisma.$disconnect();
});
