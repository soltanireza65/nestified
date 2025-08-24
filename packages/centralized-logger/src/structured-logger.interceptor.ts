import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class StructuredLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(StructuredLoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<object> {
    const ctxType = context.getType<'http' | 'rpc' | 'ws'>();
    const now = Date.now();

    let method: string | undefined;
    let payload: object = {};
    let metadata: Record<string, object> = {};

    if (ctxType === 'http') {
      const req = context.switchToHttp().getRequest();
      method = `[HTTP] ${req.method} ${req.url}`;
      payload = { body: req.body ?? {} };
      metadata = { ip: req.ip, headers: req.headers };
    }

    if (ctxType === 'rpc') {
      const rpcCtx = context.switchToRpc();
      method = `[RPC] ${context.getHandler().name}`;
      payload = { data: rpcCtx.getData() ?? {} };
      metadata = { pattern: rpcCtx.getContext() };
    }

    if (ctxType === 'ws') {
      const wsCtx = context.switchToWs();
      method = `[WS] ${context.getHandler().name}`;
      payload = { data: wsCtx.getData() ?? {} };
    }

    this.logger.log({
      message: `${method} - incoming`,
      context: ctxType.toUpperCase(),
      payload: payload,
      metadata,
    });

    return next.handle().pipe(
      tap({
        next: (value) => {
          const duration = Date.now() - now;
          this.logger.log({
            message: `${method} - completed in ${duration}ms`,
            context: ctxType.toUpperCase(),
            response: value,
          });
        },
        error: (err) => {
          const status = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
          const duration = Date.now() - now;
          this.logger.error({
            message: `${method} - error in ${duration}ms`,
            context: ctxType.toUpperCase(),
            status,
            error: err,
          });
        },
      }),
    );
  }
}
