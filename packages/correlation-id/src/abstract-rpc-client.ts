import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CorrelationIdService } from './correlation-id.service';
import { Observable } from 'rxjs';
import { CORRELATION_ID_HEADER } from './correlation-id.constants';

@Injectable()
export abstract class AbstractRpcClient {
  protected constructor(
    protected readonly client: ClientProxy,
    protected readonly correlationIdService: CorrelationIdService,
  ) {}

  protected buildPayload<TPayload = unknown>(payload: TPayload): TPayload {
    const correlationId = this.correlationIdService.get();
    return {
      ...payload,
      headers: {
        ...(payload as any)?.headers,
        [CORRELATION_ID_HEADER]: correlationId,
      },
    };
  }

  send<TResult = any, TPayload = any>(
    pattern: any,
    payload: TPayload,
  ): Observable<TResult> {
    return this.client.send(pattern, this.buildPayload(payload));
  }

  emit<TResult = any, TPayload = any>(
    pattern: any,
    payload: TPayload,
  ): Observable<TResult> {
    return this.client.emit(pattern, this.buildPayload(payload));
  }
}
