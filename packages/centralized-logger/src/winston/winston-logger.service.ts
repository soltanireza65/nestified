import { CorrelationIdService } from '@nestified/correlation-id';
import { Inject, Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as winston from 'winston';
import { Logger as WinstonLogger } from 'winston';
import { MODULE_OPTIONS_TOKEN } from '../structured-logger.definition';
import { ILoggerOptions } from '../structured-logger.interfaces';
import {
  messageType,
  StructuredLoggerService,
} from '../structured-logger.service';

@Injectable()
export class WinstonStructuredLoggerService implements StructuredLoggerService {
  private readonly logger: WinstonLogger;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: ILoggerOptions,
    private readonly correlationIdService: CorrelationIdService,
  ) {
    this.logger = this.createLogger();
  }

  private createLogger() {
    const logger = winston.createLogger({
      level: this.options.level || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        ...(this.options.injectCorrelationId
          ? [winston.format.injectCorrelationId(this.correlationIdService)]
          : []),
        ...(this.options.environment === 'development'
          ? [
              winston.format.colorize({ all: true }),
              winston.format.printf(
                ({ level, message, timestamp, context, correlationId }) => {
                  return `${timestamp} [${level}]${context ? ` [${context}]` : ''}${correlationId ? ` [${correlationId}]` : ''}: ${message}`;
                },
              ),
            ]
          : [
              winston.format.redact({
                fields: this.options.redactFields || [],
              }),
              winston.format.json(),
            ]),
      ),
      defaultMeta: { service: this.options.serviceName },
      transports: [new winston.transports.Console()],
    });

    if (this.options.logDir) {
      const relativePath = this.options.logDir;
      const logDir = path.resolve(process.cwd(), relativePath);

      logger.add(
        new winston.transports.File({
          filename: 'combined.log',
          dirname: logDir,
        }),
      );
      logger.add(
        new winston.transports.File({
          filename: 'error.log',
          dirname: logDir,
          level: 'error',
        }),
      );
    }

    return logger;
  }

  log(message: messageType, context?: string) {
    this.logger.info(JSON.stringify(message), { context });
  }

  error(message: messageType, trace?: string, context?: string) {
    this.logger.error(JSON.stringify(message), { trace, context });
  }

  warn(message: messageType, context?: string) {
    this.logger.warn(JSON.stringify(message), { context });
  }

  debug(message: messageType, context?: string) {
    this.logger.debug(JSON.stringify(message), { context });
  }

  verbose(message: messageType, context?: string) {
    this.logger.verbose(JSON.stringify(message), { context });
  }

  setLevel(level: 'info' | 'debug' | 'warn' | 'error') {
    this.logger.level = level;
  }
}
