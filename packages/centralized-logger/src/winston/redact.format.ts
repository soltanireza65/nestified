import { Format } from 'logform';
import { format } from 'winston';
import { IRedactOptions } from '../structured-logger.interfaces';
import * as winston from 'winston';

const DEFAULT_PLACEHOLDER = '[REDACTED]';

export const redactFormat = (opts: IRedactOptions): Format => {
  const blacklist = opts.fields.map((f) => f.toLowerCase());
  const placeholder = opts.placeholder ?? DEFAULT_PLACEHOLDER;

  const deepRedact = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map(deepRedact);
    }

    if (input !== null && typeof input === 'object') {
      return Object.fromEntries(
        Object.entries(input).map(([key, value]) => {
          const isBlacklisted = blacklist.includes(key.toLowerCase());
          if (isBlacklisted) return [key, placeholder];
          return [key, deepRedact(value)];
        }),
      );
    }

    return input;
  };

  const redactString = (msg: string): string => {
    let redacted = msg;
    blacklist.forEach((field) => {
      const regex = new RegExp(`${field}\\s*[:=]\\s*([^\\s,]+)`, 'gi');
      redacted = redacted.replace(regex, `${field}: ${placeholder}`);
    });
    return redacted;
  };

  return format((info) => {
    if (typeof info.message === 'string') {
      info.message = redactString(info.message);
    }

    for (const key of ['payload', 'response', 'metadata']) {
      if (typeof info[key] === 'object') {
        info[key] = deepRedact(info[key]);
      }
    }

    return info;
  })();
};
