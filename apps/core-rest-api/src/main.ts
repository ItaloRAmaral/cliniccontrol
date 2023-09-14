/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { version } from '@clinicControl/root/package.json';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiModule } from '../../../libs/core-rest-api/adapters/src/controllers/api/api.module';

const setupOpenApi = (app: INestApplication) => {
  // Setting up Swagger document
  const options = new DocumentBuilder()
    .setTitle('Clinic Control Restful API')
    .setDescription('Clinic Control Restful API')
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true, // With this option set to true, we no longer need to specify types with the @Type decorator;
      },
    })
  );

  // Setting up Swagger document
  setupOpenApi(app);

  // Listen on specified port
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
