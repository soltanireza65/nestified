import { Module, ConfigurableModuleBuilder } from '@nestjs/common';
import { CorrelationIdService } from './correlation-id.service';
import { CorrelationIdMiddleware } from './correlation-id.middleware';
import { CorrelationIdOptions } from './correlation-id.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<CorrelationIdOptions>()
  .setClassMethodName('forRoot')
  .build();

export const CORRELATION_ID_MODULE_OPTIONS = MODULE_OPTIONS_TOKEN;

@Module({
  providers: [CorrelationIdService, CorrelationIdMiddleware],
  exports: [CorrelationIdService, CorrelationIdMiddleware],
})
export class CorrelationIdModule extends ConfigurableModuleClass {}
