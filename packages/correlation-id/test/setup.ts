import { Test } from '@nestjs/testing';
import { CorrelationIdModule } from '../src/correlation-id.module';

export async function createTestingModule() {
  return Test.createTestingModule({
    imports: [CorrelationIdModule],
  }).compile();
}
