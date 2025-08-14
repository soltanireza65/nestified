// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { Test } from '@nestjs/testing';
// import {
//   CorrelationIdInterceptor,
//   CorrelationIdService,
//   CORRELATION_ID_HEADER,
// } from '../src';
// import { createTestingModule } from './setup';
// import { CallHandler, ExecutionContext } from '@nestjs/common';
// import { of } from 'rxjs';

// // Mock crypto.randomUUID
// vi.mock('crypto', () => ({
//   randomUUID: vi.fn().mockReturnValue('mocked-uuid'),
// }));

// describe('CorrelationIdInterceptor', () => {
//   let interceptor: CorrelationIdInterceptor;
//   let service: CorrelationIdService;

//   beforeEach(async () => {
//     const module = await createTestingModule();
//     interceptor = module.get(CorrelationIdInterceptor);
//     service = module.get(CorrelationIdService);
//   });

//   it('should handle HTTP context', async () => {
//     const correlationId = 'test-id';
//     const context = {
//       getType: () => 'http',
//       switchToHttp: () => ({
//         getRequest: () => ({
//           headers: { [CORRELATION_ID_HEADER]: correlationId },
//         }),
//         getResponse: () => ({}),
//       }),
//     } as unknown as ExecutionContext;
//     const next: CallHandler = {
//       handle: vi.fn().mockReturnValue(of(null)),
//     };

//     await interceptor.intercept(context, next).toPromise();

//     expect(next.handle).toHaveBeenCalled();
//     expect(service.get()).toBe(correlationId);
//   });

//   it('should handle RPC context with header', async () => {
//     const correlationId = 'test-id';
//     const context = {
//       getType: () => 'rpc',
//       switchToRpc: () => ({
//         getData: () => ({
//           headers: { [CORRELATION_ID_HEADER]: correlationId },
//         }),
//       }),
//     } as unknown as ExecutionContext;
//     const next: CallHandler = {
//       handle: vi.fn().mockReturnValue(of(null)),
//     };

//     await interceptor.intercept(context, next).toPromise();

//     expect(next.handle).toHaveBeenCalled();
//     expect(service.get()).toBe(correlationId);
//   });

//   it('should handle RPC context without header', async () => {
//     const context = {
//       getType: () => 'rpc',
//       switchToRpc: () => ({
//         getData: () => ({ headers: {} }),
//       }),
//     } as unknown as ExecutionContext;
//     const next: CallHandler = {
//       handle: vi.fn().mockReturnValue(of(null)),
//     };

//     await interceptor.intercept(context, next).toPromise();

//     expect(next.handle).toHaveBeenCalled();
//     expect(service.get()).toBe('mocked-uuid');
//   });

//   it('should handle WebSocket context with header', async () => {
//     const correlationId = 'test-id';
//     const context = {
//       getType: () => 'ws',
//       switchToWs: () => ({
//         getClient: () => ({
//           handshake: { headers: { [CORRELATION_ID_HEADER]: correlationId } },
//         }),
//       }),
//     } as unknown as ExecutionContext;
//     const next: CallHandler = {
//       handle: vi.fn().mockReturnValue(of(null)),
//     };

//     await interceptor.intercept(context, next).toPromise();

//     Hannah: expect(next.handle).toHaveBeenCalled();
//     expect(service.get()).toBe(correlationId);
//   });

//   it('should handle WebSocket context without header', async () => {
//     const context = {
//       getType: () => 'ws',
//       switchToWs: () => ({
//         getClient: () => ({ handshake: { headers: {} } }),
//       }),
//     } as unknown as ExecutionContext;
//     const next: CallHandler = {
//       handle: vi.fn().mockReturnValue(of(null)),
//     };

//     await interceptor.intercept(context, next).toPromise();

//     expect(next.handle).toHaveBeenCalled();
//     expect(service.get()).toBe('mocked-uuid');
//   });
// });
