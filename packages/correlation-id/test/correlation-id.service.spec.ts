// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { Test } from '@nestjs/testing';
// import { CorrelationIdService } from '../src/correlation-id.service';

// describe('CorrelationIdService', () => {
//   let service: CorrelationIdService;

//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       providers: [CorrelationIdService],
//     }).compile();

//     service = module.get(CorrelationIdService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should set and get correlation ID within the same context', () => {
//     const correlationId = 'test-id';
//     service.set(correlationId);
//     expect(service.get()).toBe(correlationId);
//   });

//   it('should return undefined outside of context', () => {
//     expect(service.get()).toBeUndefined();
//   });

//   it('should manage correlation ID within run context', () => {
//     const correlationId = 'test-id';
//     let result: string | undefined;

//     service.run(correlationId, () => {
//       result = service.get();
//     });

//     expect(result).toBe(correlationId);
//     expect(service.get()).toBeUndefined(); // Outside context
//   });

//   it('should isolate contexts in nested run calls', () => {
//     const outerId = 'outer-id';
//     const innerId = 'inner-id';
//     let outerResult: string | undefined;
//     let innerResult: string | undefined;

//     service.run(outerId, () => {
//       outerResult = service.get();
//       service.run(innerId, () => {
//         innerResult = service.get();
//       });
//     });

//     expect(outerResult).toBe(outerId);
//     expect(innerResult).toBe(innerId);
//     expect(service.get()).toBeUndefined();
//   });
// });
