// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { Test } from '@nestjs/testing';
// import {
//   CorrelationIdMiddleware,
//   CorrelationIdService,
//   CORRELATION_ID_HEADER,
// } from '../src';
// import { createTestingModule } from './setup';

// // Mock crypto.randomUUID
// vi.mock('crypto', () => ({
//   randomUUID: vi.fn().mockReturnValue('mocked-uuid'),
// }));

// describe('CorrelationIdMiddleware', () => {
//   let middleware: CorrelationIdMiddleware;
//   let service: CorrelationIdService;

//   beforeEach(async () => {
//     const module = await createTestingModule();
//     middleware = module.get(CorrelationIdMiddleware);
//     service = module.get(CorrelationIdService);
//   });

//   it('should set correlation ID from incoming header', async () => {
//     const correlationId = 'test-id';
//     const req = { headers: { [CORRELATION_ID_HEADER]: correlationId } } as any;
//     const res = { setHeader: vi.fn() } as any;
//     const next = vi.fn();

//     await middleware.use(req, res, next);

//     expect(res.setHeader).toHaveBeenCalledWith(
//       CORRELATION_ID_HEADER,
//       correlationId,
//     );
//     expect(next).toHaveBeenCalled();
//     expect(service.get()).toBe(correlationId);
//   });

//   it('should generate new correlation ID if none provided', async () => {
//     const req = { headers: {} } as any;
//     const res = { setHeader: vi.fn() } as any;
//     const next = vi.fn();

//     await middleware.use(req, res, next);

//     expect(res.setHeader).toHaveBeenCalledWith(
//       CORRELATION_ID_HEADER,
//       'mocked-uuid',
//     );
//     expect(next).toHaveBeenCalled();
//     expect(service.get()).toBe('mocked-uuid');
//   });

//   it('should maintain correlation ID in async context', async () => {
//     const correlationId = 'test-id';
//     const req = { headers: { [CORRELATION_ID_HEADER]: correlationId } } as any;
//     const res = { setHeader: vi.fn() } as any;
//     const next = vi.fn();

//     await middleware.use(req, res, next);

//     let contextId: string | undefined;
//     service.run(correlationId, () => {
//       contextId = service.get();
//     });

//     expect(contextId).toBe(correlationId);
//     expect(service.get()).toBe(correlationId); // Middleware context persists
//   });
// });
