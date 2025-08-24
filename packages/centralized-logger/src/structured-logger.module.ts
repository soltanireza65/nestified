import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './structured-logger.definition';
import { StructuredLoggerService } from './structured-logger.service';
import { WinstonStructuredLoggerService } from './winston/winston-logger.service';
import { CorrelationIdModule } from '@nestified/correlation-id';
import { StructuredLoggerInterceptor } from './structured-logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [CorrelationIdModule],
  providers: [
    {
      provide: StructuredLoggerService,
      useClass: WinstonStructuredLoggerService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: StructuredLoggerInterceptor,
    },
  ],
  exports: [StructuredLoggerService],
})
export class StructuredLoggerModule extends ConfigurableModuleClass {}
