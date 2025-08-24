import { Injectable, LoggerService as NestLogger } from '@nestjs/common';

export type messageType = string | object;

@Injectable()
export abstract class StructuredLoggerService implements NestLogger {
  abstract log(message: messageType, context?: string): void;

  abstract error(message: messageType, trace?: string, context?: string): void;

  abstract warn(message: messageType, context?: string): void;

  abstract debug(message: messageType, context?: string): void;

  abstract verbose(message: messageType, context?: string): void;

  abstract setLevel(level: 'info' | 'debug' | 'warn' | 'error'): void;
}
