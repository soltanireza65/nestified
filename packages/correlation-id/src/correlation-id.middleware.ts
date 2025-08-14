import { Injectable, NestMiddleware } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CorrelationIdService } from "./correlation-id.service";
import { CORRELATION_ID_HEADER } from "./correlation-id.constants";

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  use(req: any, res: any, next: any) {
    const incomingId = req.headers[CORRELATION_ID_HEADER] as string;
    const correlationId = incomingId || randomUUID();

    this.correlationIdService.run(correlationId, () => {
      res.setHeader(CORRELATION_ID_HEADER, correlationId);

      next();
    });
  }
}
