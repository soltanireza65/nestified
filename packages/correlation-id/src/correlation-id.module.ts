import { Module } from '@nestjs/common';
import { CorrelationIdService } from './correlation-id.service';
// import { CorrelationIdMiddleware } from './correlation-id.middleware';

@Module({
  providers: [CorrelationIdService],
  exports: [CorrelationIdService],
})
export class CorrelationIdModule {}
