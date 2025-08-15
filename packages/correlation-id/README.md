# `@nestified/correlation-id`

**Automatic Correlation ID tracking for NestJS** — HTTP, RPC, and WebSocket ready.

---

## ✨ Why use it?

- Automatically **generates** or **propagates** correlation IDs for every request.
- Works with **HTTP**, **microservices (RPC)**, and **WebSockets**.
- Fully compatible with **NestJS async context** (`AsyncLocalStorage`).
- Minimal, framework-agnostic core — plug it into any architecture.
- Drop-in **middleware** and **interceptor**.

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

### 1. HTTP / API Gateways

Register the middleware globally:

```ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  CorrelationIdMiddleware,
  CorrelationIdModule,
} from '@nestified/correlation-id';

@Module({
  imports: [CorrelationIdModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
```

---

### 2. RPC / Microservices

Register the interceptor globally:

```ts
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  CorrelationIdInterceptor,
  CorrelationIdModule,
} from '@nestified/correlation-id';

@Module({
  imports: [CorrelationIdModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CorrelationIdInterceptor }],
})
export class AppModule {}
```

---

### 3. Access the Correlation ID Anywhere

```ts
import { Injectable } from '@nestjs/common';
import { CorrelationIdService } from '@nestified/correlation-id';

@Injectable()
export class AppService {
  constructor(private readonly correlationId: CorrelationIdService) {}

  getHello() {
    return `Correlation ID: ${this.correlationId.get()}`;
  }
}
```

---

## 📋 Usage Examples

### Logging with Correlation IDs

```ts
import { Logger } from '@nestjs/common';
import { CorrelationIdService } from '@nestified/correlation-id';

@Injectable()
export class MyLogger {
  private readonly logger = new Logger(MyLogger.name);
  constructor(private readonly cid: CorrelationIdService) {}

  log(message: string) {
    this.logger.log(`[${this.cid.get()}] ${message}`);
  }
}
```

---

### Propagating IDs in RPC Clients

```ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  AbstractRpcClient,
  CorrelationIdService,
} from '@nestified/correlation-id';

@Injectable()
export class MyRpcClient extends AbstractRpcClient {
  constructor(
    @Inject('RPC_CLIENT') client: ClientProxy,
    correlationId: CorrelationIdService,
  ) {
    super(client, correlationId);
  }
}

// Now every `send` or `emit` call will include x-correlation-id automatically
```

---

## ⚙️ Advanced

| Feature               | Description                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| **Custom header key** | Default is `x-correlation-id` — override in `CorrelationIdModule.forRoot({ headerName: 'my-header' })`. |
| **RPC metadata**      | Extracts ID from `headers` in microservice payloads.                                                    |
| **WebSocket support** | Reads from handshake headers.                                                                           |
| **Manual setting**    | `correlationIdService.set('my-id')`.                                                                    |

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
