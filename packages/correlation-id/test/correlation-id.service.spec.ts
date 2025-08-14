import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { CorrelationIdService } from '../src';
import { createTestingModule } from './setup';

describe('CorrelationIdService', () => {
  let service: CorrelationIdService;

  beforeEach(async () => {
    const module = await createTestingModule();
    service = module.get(CorrelationIdService);
  });

  //   it('should generate a correlation ID', () => {
  //     const id = service.getCorrelationId();
  //     expect(id).toBeDefined();
  //     expect(typeof id).toBe('string');
  //   });

  //   it('should use custom generateId function', async () => {
  //     const customId = 'custom-id';
  //     const module = await Test.createTestingModule({
  //       providers: [
  //         {
  //           provide: CorrelationIdService,
  //           useFactory: () =>
  //             new CorrelationIdService({ generateId: () => customId }),
  //         },
  //       ],
  //     }).compile();

  //     const service = module.get(CorrelationIdService);
  //     expect(service.getCorrelationId()).toBe(customId);
  //   });
});
