import { Module, ConfigurableModuleBuilder } from '@nestjs/common';
import { CorrelationIdService } from './correlation-id.service';
import { CorrelationIdMiddleware } from 'correlation-id.middleware';

@Module({
  providers: [CorrelationIdService, CorrelationIdMiddleware],
  exports: [CorrelationIdService, CorrelationIdMiddleware],
})
export class CorrelationIdModule {}
