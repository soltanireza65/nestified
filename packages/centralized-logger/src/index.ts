export * from './structured-logger.constants';
export * from './structured-logger.module';
export * from './structured-logger.service';
import * as winston from 'winston';
import { IRedactOptions } from './structured-logger.interfaces';
import { injectCorrelationIdFormat } from './winston/correlation-id.format';
import { redactFormat } from './winston/redact.format';
import { ICorrelationIdService } from '@nestified/correlation-id';

declare module 'winston' {
  namespace format {
    function redact(options: IRedactOptions);
    function injectCorrelationId(correlationIdService: ICorrelationIdService);
  }
}

winston.format.redact = redactFormat;
winston.format.injectCorrelationId = injectCorrelationIdFormat;
