# Structured Logger Setup Guide

This guide explains how to set up and use the `@package/logger` module in your NestJS applications, including both gateway and service patterns.

---

## 📦 Import the Module

Use the `StructuredLoggerModule.registerAsync` to configure the logger dynamically via the `ConfigService`.

```ts
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StructuredLoggerModule } from '@package/logger';
import { AppController } from './app.controller';

@Module({
  imports: [
    StructuredLoggerModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        serviceName: configService.getOrThrow('APP'),
        level: configService.getOrThrow('LOG_LEVEL', 'info'),
        logDir: configService.get('LOG_DIR'),
        environment: configService.get('ENV', 'development'),
        redactFields: [
          'password',
          'authorization',
          'access-token',
          'refresh-token',
          'api-key',
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

---

## 🚀 Use Logger in Bootstrap

Enable the structured logger in your `main.ts` bootstrap file:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(StructuredLoggerService));

  await app.listen(3000);
}
```

---

## ✅ Summary

- Use `StructuredLoggerModule.registerAsync()` with `ConfigService` for dynamic setup.
- Use the logger with `app.useLogger()` in `main.ts`.

Happy logging! 📈
