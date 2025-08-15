import { NestFactory } from '@nestjs/core';
import { TestGWModule } from 'test-app.module';

async function bootstrap() {
  const app = await NestFactory.create(TestGWModule);
  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
