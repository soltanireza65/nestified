# 📑 Structured Logger Module

A **production-ready logging module for NestJS** built on top of [Winston](https://github.com/winstonjs/winston).
Features:

- ✅ **Global NestJS module** (`StructuredLoggerModule`)
- ✅ Works across **HTTP, RPC, and WebSocket** with an interceptor
- ✅ **Correlation ID** injection (via [`@nestified/correlation-id`](https://www.npmjs.com/package/@nestified/correlation-id))
- ✅ **Redaction** of sensitive fields
- ✅ **Console + File transports**
- ✅ **Environment-aware formatting** (colorized in dev, JSON in prod)

---

## 📦 Installation

```bash
npm install @nestified/centralized-logger
# or
pnpm add @nestified/centralized-logger
# or
yarn add @nestified/centralized-logger
```

---

## 🛠 Setup

Register the logger module in your root module:

```ts
import { Module } from '@nestjs/common';
import { StructuredLoggerModule } from './logger/structured-logger.module';

@Module({
  imports: [
    StructuredLoggerModule.register({
      serviceName: 'my-service',
      injectCorrelationId: true, // install and setup @nestified/correlation-id
      environment: process.env.NODE_ENV as
        | 'development'
        | 'production'
        | 'staging',
      level: 'info',
      redactFields: ['password', 'token'],
      logFilePath: 'logs',
    }),
    // OR
    StructuredLoggerModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        serviceName: configService.get('serviceName', 'serviceName'),
        injectCorrelationId: true,
        level: configService.get('LOG_LEVEL', 'info'),
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
})
export class AppModule {}
```

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

## 🔌 Usage

### Inject logger into any provider

```ts
import { Injectable } from '@nestjs/common';
import { StructuredLoggerService } from './logger/structured-logger.service';

@Injectable()
export class UsersService {
  constructor(private readonly logger: StructuredLoggerService) {}

  getUser(id: string) {
    this.logger.log(`Fetching user ${id}`, UsersService.name);
    return { id, name: 'John Doe' };
  }
}
```

### Logging methods

```ts
this.logger.log('hello world', 'MyContext');
this.logger.error('something went wrong', 'stacktrace here', 'AuthService');
this.logger.warn('deprecated method used', 'LegacyModule');
this.logger.debug('payload received', 'WebhookService');
this.logger.verbose('detailed debug info', 'JobProcessor');
```

---

## 🌐 Request Logging

The `StructuredLoggerInterceptor` logs **incoming requests** and **responses** (HTTP, RPC, WS).
Add it globally:

```ts
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StructuredLoggerInterceptor } from './logger/structured-logger.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: StructuredLoggerInterceptor,
    },
  ],
})
export class AppModule {}
```

Example log (dev mode, console):

```
2025-08-24T11:00:00.000Z [info] [HTTP] [correlationId=1234]:
[HTTP] GET /users - completed in 15ms
```

---

## 🔒 Redaction

Redacts sensitive fields in both **string messages** and **structured objects**.

```ts
redactFields: ['password', 'authorization'];
```

Output:

```json
{
  "timestamp": "2025-08-24T11:00:00.000Z",
  "level": "info",
  "message": "User login",
  "payload": {
    "username": "john",
    "password": "[REDACTED]"
  }
}
```

---

## 🧩 Options

```ts
export interface ILoggerOptions {
  serviceName: string; // Name of the service (appears in logs)
  injectCorrelationId: boolean; // Attach x-correlation-id automatically
  environment?: 'development' | 'production' | 'staging';
  level?: 'info' | 'debug' | 'warn' | 'error';
  redactFields?: string[]; // Fields to redact from logs
  logFilePath?: string; // Directory for log files
}
```

---

## 📂 Log Files

If `logFilePath` is set, Winston writes:

- `combined.log` → all logs
- `error.log` → only error logs

Example:

```
./logs/combined.log
./logs/error.log
```

---

## 📌 Correlation ID

Requests get tagged with `x-correlation-id`.
If not provided, a new one is generated.
This helps trace logs across microservices.

---

## ✅ Summary

- Import `StructuredLoggerModule` once (global).
- Inject `StructuredLoggerService` wherever you need logs.
- Use `StructuredLoggerInterceptor` for automatic request/response logging.
- Logs are structured, redact sensitive fields, and include correlation IDs.

---

## 📄 License

MIT © 2025 — Nestified
