import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CORRELATION_ID_HEADER } from '@nestified/correlation-id';
import { TestGWModule, TestRPCModule } from './test-app.module';

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomUUID: () => 'mock-uuid',
}));

describe('CorrelationId http E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestGWModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should generate correlation ID if missing', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect(res.body.correlationId).toBe('mock-uuid');
    expect(res.headers[CORRELATION_ID_HEADER]).toBe('mock-uuid');
  });

  it('should use incoming correlation ID if provided', async () => {
    const res = await request(app.getHttpServer())
      .get('/')
      .set(CORRELATION_ID_HEADER, 'incoming-id');

    expect(res.body.correlationId).toBe('incoming-id');
    expect(res.headers[CORRELATION_ID_HEADER]).toBe('incoming-id');
  });
});
