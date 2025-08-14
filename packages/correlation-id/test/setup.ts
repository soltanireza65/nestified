import { Test } from '@nestjs/testing';
import {
  CorrelationIdInterceptor,
  CorrelationIdMiddleware,
  CorrelationIdModule,
} from '../src';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CorrelationIdModule.forRoot({})],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor,
    },
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}

export async function createTestingModule() {
  const module = await Test.createTestingModule({
    imports: [CorrelationIdModule.forRoot({})],
  }).compile();

  return module;
}
