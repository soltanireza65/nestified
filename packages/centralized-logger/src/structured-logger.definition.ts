import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ILoggerOptions } from './structured-logger.interfaces';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  ASYNC_OPTIONS_TYPE,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ILoggerOptions>().build();
