import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import {
  CorrelationIdMiddleware,
  CorrelationIdService,
  CORRELATION_ID_MODULE_OPTIONS,
  CorrelationIdModule,
} from '../src';
import { createTestingModule } from './setup';
import { Request, Response } from 'express';

describe('CorrelationIdMiddleware', () => {
  let middleware: CorrelationIdMiddleware;

  beforeEach(async () => {
    const module = await createTestingModule();
    middleware = module.get(CorrelationIdMiddleware);
  });

  // it('should add correlation ID to request and response', async () => {
  //   const req = { get: vi.fn().mockReturnValue(undefined) } as any as Request;
  //   const res = { setHeader: vi.fn() } as any as Response;
  //   const next = vi.fn();

  //   await middleware.use(req, res, next);

  //   expect(req.correlationId).toBeDefined();
  //   expect(res.setHeader).toHaveBeenCalledWith(
  //     'X-Correlation-Id',
  //     expect.any(String),
  //   );
  //   expect(next).toHaveBeenCalled();
  // });

  // it('should use existing correlation ID from header', async () => {
  //   const correlationId = 'test-id';
  //   const req = {
  //     get: vi.fn().mockReturnValue(correlationId),
  //   } as any as Request;
  //   const res = { setHeader: vi.fn() } as any as Response;
  //   const next = vi.fn();

  //   await middleware.use(req, res, next);

  //   expect(req.correlationId).toBe(correlationId);
  //   expect(res.setHeader).not.toHaveBeenCalled();
  //   expect(next).toHaveBeenCalled();
  // });

  // it('should use custom header from options', async () => {
  //   const customHeader = 'X-Custom-Id';
  //   const module = await Test.createTestingModule({
  //     imports: [
  //       CorrelationIdModule.forRoot({
  //         header: customHeader,
  //       }),
  //     ],
  //   }).compile();

  //   const middleware = module.get(CorrelationIdMiddleware);
  //   const req = { get: vi.fn().mockReturnValue(undefined) } as any as Request;
  //   const res = { setHeader: vi.fn() } as any as Response;
  //   const next = vi.fn();

  //   await middleware.use(req, res, next);

  //   expect(req.correlationId).toBeDefined();
  //   expect(res.setHeader).toHaveBeenCalledWith(
  //     customHeader,
  //     expect.any(String),
  //   );
  //   expect(next).toHaveBeenCalled();
  // });
});
