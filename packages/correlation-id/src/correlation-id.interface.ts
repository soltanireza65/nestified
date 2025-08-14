export interface ICorrelationIdService {
  set(id: string): void;
  get: () => string | undefined;
  run(id: string, cb: () => void): void;
}

export interface CorrelationIdOptions {
  header?: string; // Custom header for correlation ID
  generateId?: () => string; // Custom ID generator
}
