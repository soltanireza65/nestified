import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CorrelationIdMiddleware } from './correlation-id.middleware';
import { CorrelationIdService } from './correlation-id.service';
import { CORRELATION_ID_HEADER } from './correlation-id.constants';
import { randomUUID } from 'crypto';

// Mock crypto.randomUUID
vi.mock('crypto', async () => {
  const actual = await vi.importActual<any>('crypto');
  return {
    ...actual,
    randomUUID: vi.fn(() => 'mock-uuid'),
  };
});

describe('CorrelationIdMiddleware', () => {
  let middleware: CorrelationIdMiddleware;
  let service: CorrelationIdService;

  beforeEach(() => {
    service = new CorrelationIdService();
    service.run = vi.fn((id, fn) => fn());

    middleware = new CorrelationIdMiddleware(service);
  });

  it('should use incoming correlation ID if present', () => {
    const req = { headers: { [CORRELATION_ID_HEADER]: 'incoming-id' } };
    const res = { setHeader: vi.fn() };
    const next = vi.fn();

    middleware.use(req, res, next);

    expect(service.run).toHaveBeenCalledWith(
      'incoming-id',
      expect.any(Function),
    );
    expect(res.setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      'incoming-id',
    );
    expect(next).toHaveBeenCalled();
  });

  it('should generate a new UUID if no incoming ID', () => {
    const req = { headers: {} };
    const res = { setHeader: vi.fn() };
    const next = vi.fn();

    middleware.use(req, res, next);

    expect(randomUUID).toHaveBeenCalled();
    expect(service.run).toHaveBeenCalledWith('mock-uuid', expect.any(Function));
    expect(res.setHeader).toHaveBeenCalledWith(
      CORRELATION_ID_HEADER,
      'mock-uuid',
    );
    expect(next).toHaveBeenCalled();
  });
});
