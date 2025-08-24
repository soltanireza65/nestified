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
    StructuredLoggerModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        serviceName: configService.get('serviceName', 'serviceName'),
        injectCorrelationId: true, // install and setup @nestified/correlation-id
        level: configService.get('LOG_LEVEL', 'info'),
        logDir: configService.get('LOG_DIR'),
        environment: configService.get('ENV', 'development'),
        redactFields: ['password', 'authorization'],
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

@Injectable()
export class UsersService {
  constructor(private readonly logger: Logger) {}

  getUser(id: string) {
    this.logger.log(`Fetching user ${id}`, UsersService.name); // now you're using StructuredLoggerService
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

## 🌐 Request/Response Logging

`StructuredLoggerInterceptor` automatically logs incoming requests and responses for **HTTP, RPC, and WS**.

````

Example log (production mode):

```json
{
  "context": "StructuredLoggerInterceptor",
  "correlationId": "b186776f-8d68-4745-b5b2-4b711d4ddfe3",
  "level": "info",
  "message": {
    "context": "HTTP",
    "message": "[HTTP] GET / - incoming",
    "metadata": {
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,_/_;q=0.8",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.5",
        "connection": "keep-alive",
        "host": "localhost:8000",
        "if-none-match": "W/\"38-EkWGXeI7T6OCd6tPcOz4ZqERshw\"",
        "priority": "u=0, i",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64; rv:141.0) Gecko/20100101 Firefox/141.0"
      },
      "ip": "::ffff:127.0.0.1"
    },
    "payload": {}
  },
  "service": "my-service",
  "timestamp": "2025-08-24T12:23:18.007Z"
}

````

```json
{
  "context": "StructuredLoggerInterceptor",
  "correlationId": "b186776f-8d68-4745-b5b2-4b711d4ddfe3",
  "level": "info",
  "message": {
    "context": "HTTP",
    "message": "[HTTP] GET / - completed in 0ms",
    "response": { "PING": "PONG" }
  },
  "service": "my-service",
  "timestamp": "2025-08-24T12:23:18.007Z"
}
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
  serviceName: string;
  injectCorrelationId: boolean;
  environment?: 'development' | 'production' | 'staging';
  level?: 'info' | 'debug' | 'warn' | 'error';
  redactFields?: string[];
  logDir?: string;
}
```

---

## 📂 Log Files

When `logDir` is set:

- `combined.log` → all logs
- `error.log` → error logs only

---

## ✅ Summary

- Import `StructuredLoggerModule` once (global).
- Inject `Logger` wherever you need it.
- Request/response logging is automatic with the interceptor.
- Logs are structured, redact sensitive data, and include correlation IDs.

---

## 📄 License

MIT © 2025 — Nestified
