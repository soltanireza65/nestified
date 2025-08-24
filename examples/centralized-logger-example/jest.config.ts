import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const config: Config = {
  ...createDefaultPreset(),
  testRegex: '.*\\.e2e-spec\\.ts$',
};

export default config;
