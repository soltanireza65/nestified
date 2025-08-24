import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './structured-logger.definition';
import { StructuredLoggerService } from './structured-logger.service';
import { WinstonStructuredLoggerService } from './winston/winston-logger.service';

@Global()
@Module({
  providers: [
    WinstonStructuredLoggerService,
    {
      provide: StructuredLoggerService,
      useExisting: WinstonStructuredLoggerService,
    },
  ],
  exports: [StructuredLoggerService],
})
export class StructuredLoggerModule extends ConfigurableModuleClass {}
