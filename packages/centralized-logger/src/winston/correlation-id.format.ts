import { ICorrelationIdService } from '@nestified/correlation-id';
import * as winston from 'winston';

export const injectCorrelationIdFormat = (
  correlationIdService: ICorrelationIdService,
) => {
  return winston.format((info) => {
    const correlationId = correlationIdService.get();

    if (correlationId) {
      info.correlationId = correlationId;
    }

    return info;
  })();
};
