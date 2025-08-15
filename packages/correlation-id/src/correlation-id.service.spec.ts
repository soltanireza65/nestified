import { describe, it, expect, beforeEach } from 'vitest';
import { CorrelationIdService } from './correlation-id.service';

describe('CorrelationIdService', () => {
  let service: CorrelationIdService;

  beforeEach(() => {
    service = new CorrelationIdService();
  });

  it('should set and get correlationId in the same async context', () => {
    service.set('abc-123');
    expect(service.get()).toBe('abc-123');
  });

  it('should return undefined if correlationId is not set', () => {
    expect(service.get()).toBeUndefined();
  });

  it('should run a function with correlationId set', () => {
    const result = service.run('xyz-789', () => {
      return service.get();
    });
    expect(result).toBe('xyz-789');
  });

  it('should keep correlationId isolated across different async calls', async () => {
    const results: (string | undefined)[] = [];

    await Promise.all([
      new Promise<void>((resolve) => {
        service.run('req-1', async () => {
          await new Promise((r) => setTimeout(r, 10));
          results.push(service.get());
          resolve();
        });
      }),
      new Promise<void>((resolve) => {
        service.run('req-2', async () => {
          await new Promise((r) => setTimeout(r, 5));
          results.push(service.get());
          resolve();
        });
      }),
    ]);

    expect(results).toContain('req-1');
    expect(results).toContain('req-2');
    expect(new Set(results).size).toBe(2); // both IDs are distinct
  });
});
