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
import { StructuredLoggerModule } from '@nestified/centralized-logger';
import { ConfigService } from '@nestjs/config';

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
    StructuredLoggerModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        serviceName: configService.getOrThrow('APP'),
        level: configService.getOrThrow('LOG_LEVEL', 'info'),
        logDir: configService.get('LOG_DIR'),
        environment: configService.get('ENV', 'development'),
        redactFields: [
          'password',
          'authorization',
          'access-token',
          'refresh-token',
          'api-key',
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TestController],
})
export class TestAppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
