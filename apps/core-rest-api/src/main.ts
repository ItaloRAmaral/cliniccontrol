/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { INestApplication, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from '../package.json';
import { ApiModule } from './app/adapters/api.module';
import { EnvService } from './app/adapters/env/env.service';
import { mainDescriptionMarkdown } from './main.docs';

const setupOpenApi = (app: INestApplication) => {
  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('Clinic Control Restful API')
    .setDescription(mainDescriptionMarkdown)
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const globalPrefix = 'core';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true, // With this option set to true, we no longer need to specify types with the @Type decorator;
      },
    }),
  );

  // Enable version
  app.enableVersioning({ type: VersioningType.URI });

  // Setting up Swagger document
  setupOpenApi(app);

  // Listen on specified port
  const configService = app.get(EnvService);
  const port = configService.get('PORT');

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
