import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CorrelationIdService } from './correlation-id.service';
import { CORRELATION_ID_HEADER } from './correlation-id.constants';
import { randomUUID } from 'crypto';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const type = context.getType();
    let id: string | undefined;

    if (type === 'rpc') {
      const ctx = context.switchToRpc();
      const data = ctx.getData();
      const headers = (data?.headers || {}) as Record<string, string>;
      id = headers[CORRELATION_ID_HEADER] || randomUUID();
    } else if (type === 'ws') {
      const client = context.switchToWs().getClient();
      id = client?.handshake?.headers?.[CORRELATION_ID_HEADER];
    }

    id = id ?? randomUUID();

    return this.correlationIdService.run(id, () => next.handle());
  }
}
