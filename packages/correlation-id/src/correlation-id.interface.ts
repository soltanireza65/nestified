export interface ICorrelationIdService {
  set(id: string): void;
  get: () => string | undefined;
  run(id: string, cb: () => void): void;
}
