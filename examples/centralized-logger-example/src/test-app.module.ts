import { StructuredLoggerModule } from '@nestified/centralized-logger';
import {
  CorrelationIdMiddleware,
  CorrelationIdModule,
  CorrelationIdService,
} from '@nestified/correlation-id';
import {
  Controller,
  Get,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class TestController {
  constructor(private readonly correlationIdService: CorrelationIdService) {}

  @MessagePattern('getId')
  @Get()
  getId() {
    return { correlationId: this.correlationIdService.get() };
  }
}

@Module({
  imports: [
    CorrelationIdModule,
    StructuredLoggerModule.register({
      serviceName: 'my-service',
      injectCorrelationId: true, // install and setup @nestified/correlation-id
      environment: 'production',
      level: 'info',
      redactFields: ['password', 'token'],
      logDir: 'logs',
    }),
  ],
  controllers: [TestController],
})
export class TestAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
