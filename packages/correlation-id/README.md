Here’s a **basic but professional documentation draft** for your `@nestified/correlation-id` package.
It follows a structure similar to popular NestJS packages so it looks familiar to developers.

---

# `@nestified/correlation-id`

A lightweight, framework-agnostic **Correlation ID** utility for NestJS that ensures every incoming request (HTTP, WebSocket, RPC) has a unique identifier for distributed tracing and logging.

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
  imports: [
    CorrelationIdModule.forRoot({
      headerName: 'x-correlation-id', // optional, default is x-correlation-id
      generate: true, // automatically generate if not provided
    }),
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
    const correlationId = this.correlationIdService.getId();
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
    this.logger.log(`[${this.correlationIdService.getId()}] ${message}`);
  }
}
```

---

## ⚙️ Configuration Options

| Option        | Type      | Default            | Description                                         |
| ------------- | --------- | ------------------ | --------------------------------------------------- |
| `headerName`  | `string`  | `x-correlation-id` | The HTTP header key to use for correlation IDs      |
| `generate`    | `boolean` | `true`             | Whether to generate a new correlation ID if missing |
| `uuidVersion` | `4 \| 1`  | `4`                | UUID version for generation                         |

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

If you want, I can also **add an architecture diagram** showing how the middleware, interceptor, and service interact in the request lifecycle so the package is easier to understand at a glance. That would make it look very professional.
