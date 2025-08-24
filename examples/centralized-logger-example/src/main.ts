import { StructuredLoggerService } from '@nestified/centralized-logger';
import { NestFactory } from '@nestjs/core';
import { TestAppModule } from 'test-app.module';

async function bootstrap() {
  const app = await NestFactory.create(TestAppModule, { bufferLogs: true });

  app.useLogger(app.get(StructuredLoggerService));

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
