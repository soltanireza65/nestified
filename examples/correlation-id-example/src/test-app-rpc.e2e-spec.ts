import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, INestMicroservice } from '@nestjs/common';
import * as request from 'supertest';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdModule,
  CorrelationIdService,
} from '@nestified/correlation-id';
import { TestRPCModule } from './test-app.module';
import {
  ClientProxy,
  ClientProxyFactory,
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: () => 'mock-uuid',
}));

describe('CorrelationId RPC E2E', () => {
  let app: INestApplication;
  let client: ClientProxy;

  const PATTERN = 'getId';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TestRPCModule,
        ClientsModule.register([
          {
            name: 'client',
            transport: Transport.TCP,
            options: {
              host: '0.0.0.0',
              port: 1234,
            },
          },
        ]),
      ],
    }).compile();
    app = moduleFixture.createNestApplication({});
    app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.TCP,
        options: {
          host: '0.0.0.0',
          port: 1234,
        },
      },
      { inheritAppConfig: true },
    );

    client = app.get('client');

    await app.startAllMicroservices();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should generate correlation ID if missing', async () => {
    const res = await lastValueFrom(
      client.send(PATTERN, {
        headers: { [CORRELATION_ID_HEADER]: 'rpc-id-123' },
      }),
    );
    expect(res.correlationId).toBe('rpc-id-123');
  });

  it('should generate a correlation ID if missing', async () => {
    const res = await lastValueFrom(client.send(PATTERN, {}));
    expect(res.correlationId).toBeDefined();
  });
});
