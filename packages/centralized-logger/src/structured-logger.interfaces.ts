export interface ILoggerOptions {
  serviceName: string;
  injectCorrelationId?: boolean;
  environment?: 'development' | 'production' | 'staging';
  level?: 'info' | 'debug' | 'warn' | 'error';
  redactFields?: string[];
  logDir?: string;
}

export interface IRedactOptions {
  fields: string[];
  placeholder?: string;
}
