import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /hello - should return Hello, World!', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .get('/hello')
      .expect(200);

    expect(response.text).toBe('Hello, World!');
  });

  it('POST /sum - should return result: 8', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post('/sum')
      .send({ a: 5, b: 3 })
      .expect(201);

    expect(response.body).toEqual({ result: 8 });
  });

  it('POST /sum - should return 400 for invalid input', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(app.getHttpServer())
      .post('/sum')
      .send({ a: 'x', b: 5 })
      .expect(400);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(response.body.message).toBeDefined();
  });
});
