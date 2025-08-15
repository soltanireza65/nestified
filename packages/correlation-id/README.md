# `@nestified/correlation-id`

A lightweight **Correlation ID** utility for NestJS that ensures every incoming request (HTTP, WebSocket, RPC) has a unique identifier for distributed tracing and logging.

---

## ✨ Features

- ✅ **Automatic Correlation ID generation** for each request
- ✅ Works with **HTTP, RPC, and WebSocket** contexts
- ✅ **Custom header key** support (default: `x-correlation-id`)
- ✅ Built-in **NestJS middleware & interceptor** for easy integration
- ✅ Compatible with **async context tracking** (using `AsyncLocalStorage`)
- ✅ Minimal and framework-agnostic core

---

## 📦 Installation

```bash
npm install @nestified/correlation-id
# or
pnpm add @nestified/correlation-id
# or
yarn add @nestified/correlation-id
```

---

## 🚀 Quick Start

### 1. Import the Module

```ts
import { Module } from '@nestjs/common';
import { CorrelationIdModule } from '@nestified/correlation-id';

@Module({
  imports: [CorrelationIdModule],
})
export class AppModule {}
```

---

## 🌐 Provide Middleware in Gateway Apps

For gateway applications (e.g., HTTP-based), apply the `CorrelationIdMiddleware` globally:

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CorrelationIdMiddleware } from '@nestified/correlation-id';

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
```

---

## 🧩 Provide Interceptor in RPC (Microservice) Apps

For transport-based microservices, register the `CorrelationIdInterceptor` globally using the `APP_INTERCEPTOR` token:

```ts
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CorrelationIdInterceptor } from '@nestified/correlation-id';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
  ],
})
export class AppModule {}
```

---

### 2. Use in Application

#### Access the Correlation ID anywhere

```ts
import { Injectable } from '@nestjs/common';
import { CorrelationIdService } from '@nestified/correlation-id';

@Injectable()
export class AppService {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  getHello(): string {
    const correlationId = this.correlationIdService.get();
    return `Correlation ID: ${correlationId}`;
  }
}
```

---

### 3. Logging Example

```ts
import { Logger } from '@nestjs/common';
import { CorrelationIdService } from '@nestified/correlation-id';

@Injectable()
export class MyLogger {
  private readonly logger = new Logger(MyLogger.name);

  constructor(private readonly correlationIdService: CorrelationIdService) {}

  log(message: string) {
    this.logger.log(`[${this.correlationIdService.get()}] ${message}`);
  }
}
```

---

## 🧩 Advanced Usage

### Using with RPC or WebSocket

The built-in interceptor extracts correlation IDs from RPC metadata or WebSocket handshake headers automatically.

Example for manually setting in RPC client:

```ts
client.send('my-pattern', payload, {
  headers: { 'x-correlation-id': 'my-id' },
});
```

---

### Using `AbstractRpcClient` for RPC Clients

The `AbstractRpcClient` class helps propagate correlation IDs automatically for all outgoing RPC requests or events.

```ts
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CorrelationIdService,
  AbstractRpcClient,
} from '@nestified/correlation-id';

@Injectable()
export class MyRpcClient extends AbstractRpcClient {
  constructor(client: ClientProxy, correlationIdService: CorrelationIdService) {
    super(client, correlationIdService);
  }

  sendMessage(payload: any) {
    return this.send('my-pattern', payload);
  }

  emitMessage(payload: any) {
    return this.emit('my-pattern', payload);
  }
}
```

#### API

- `buildPayload(payload)` – injects correlation ID into payload headers.
- `send(pattern, payload)` – sends an RPC message with correlation ID.
- `emit(pattern, payload)` – emits an event with correlation ID.

This ensures **traceability across multiple microservices** without manually passing headers.

---

## 🛠 Development

```bash
pnpm install
pnpm build
pnpm test
```

---

## 📄 License

MIT © 2025 — Nestified

---

I can also create a **small diagram showing HTTP → Service → RPC correlation propagation** to make this section more visual and easier to understand.

Do you want me to add that diagram?
