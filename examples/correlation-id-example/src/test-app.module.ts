import { APP_INTERCEPTOR, NestFactory } from '@nestjs/core';
import { Controller, Get } from '@nestjs/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  CorrelationIdInterceptor,
  CorrelationIdMiddleware,
  CorrelationIdModule,
  CorrelationIdService,
} from '@nestified/correlation-id';
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
  imports: [CorrelationIdModule],
  controllers: [TestController],
})
export class TestGWModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}

@Module({
  imports: [CorrelationIdModule],
  controllers: [TestController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
  ],
})
export class TestRPCModule {}
