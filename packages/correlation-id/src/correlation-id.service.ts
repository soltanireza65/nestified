import { Injectable } from "@nestjs/common";
import { AsyncLocalStorage } from "async_hooks";
import { ICorrelationIdService } from "./correlation-id.interface";

@Injectable()
export class CorrelationIdService implements ICorrelationIdService {
  private readonly als = new AsyncLocalStorage<Map<string, string>>();
  set(id: string) {
    const store = new Map<string, string>();
    store.set("correlationId", id);
    this.als.enterWith(store);
  }

  get(): string | undefined {
    const store = this.als.getStore();
    return store?.get("correlationId");
  }

  run<T>(id: string, fn: () => T): T {
    const store = new Map<string, string>();
    store.set("correlationId", id);
    return this.als.run(store, fn);
  }
}
