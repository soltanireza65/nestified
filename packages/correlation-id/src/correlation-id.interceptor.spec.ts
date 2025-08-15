import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CorrelationIdInterceptor } from './correlation-id.interceptor';
import { CorrelationIdService } from './correlation-id.service';
import { CORRELATION_ID_HEADER } from './correlation-id.constants';
import { randomUUID } from 'crypto';
import { of } from 'rxjs';

vi.mock('crypto', async () => {
  const actual = await vi.importActual<any>('crypto');
  return {
    ...actual,
    randomUUID: vi.fn(() => 'mock-uuid'),
  };
});

describe('CorrelationIdInterceptor', () => {
  let interceptor: CorrelationIdInterceptor;
  let service: CorrelationIdService;
  let next: any;

  beforeEach(() => {
    service = new CorrelationIdService();
    service.run = vi.fn((id, fn) => fn());
    next = { handle: vi.fn(() => of('ok')) };
    interceptor = new CorrelationIdInterceptor(service);
  });

  it('should use incoming header in RPC context', () => {
    const context = {
      getType: () => 'rpc',
      switchToRpc: () => ({
        getData: () => ({ headers: { [CORRELATION_ID_HEADER]: 'rpc-id' } }),
      }),
    } as any;

    const result = interceptor.intercept(context, next);
    expect(service.run).toHaveBeenCalledWith('rpc-id', expect.any(Function));
    result.subscribe((v) => expect(v).toBe('ok'));
  });

  it('should generate UUID if RPC header is missing', () => {
    const context = {
      getType: () => 'rpc',
      switchToRpc: () => ({ getData: () => ({}) }),
    } as any;

    const result = interceptor.intercept(context, next);
    expect(randomUUID).toHaveBeenCalled();
    expect(service.run).toHaveBeenCalledWith('mock-uuid', expect.any(Function));
    result.subscribe((v) => expect(v).toBe('ok'));
  });

  it('should use header from WebSocket handshake', () => {
    const context = {
      getType: () => 'ws',
      switchToWs: () => ({
        getClient: () => ({
          handshake: { headers: { [CORRELATION_ID_HEADER]: 'ws-id' } },
        }),
      }),
    } as any;

    const result = interceptor.intercept(context, next);
    expect(service.run).toHaveBeenCalledWith('ws-id', expect.any(Function));
    result.subscribe((v) => expect(v).toBe('ok'));
  });

  it('should generate UUID if WebSocket header is missing', () => {
    const context = {
      getType: () => 'ws',
      switchToWs: () => ({ getClient: () => ({ handshake: { headers: {} } }) }),
    } as any;

    const result = interceptor.intercept(context, next);
    expect(randomUUID).toHaveBeenCalled();
    expect(service.run).toHaveBeenCalledWith('mock-uuid', expect.any(Function));
    result.subscribe((v) => expect(v).toBe('ok'));
  });

  it('should generate UUID for unknown context type', () => {
    const context = { getType: () => 'http' } as any;

    const result = interceptor.intercept(context, next);
    expect(randomUUID).toHaveBeenCalled();
    expect(service.run).toHaveBeenCalledWith('mock-uuid', expect.any(Function));
    result.subscribe((v) => expect(v).toBe('ok'));
  });
});
