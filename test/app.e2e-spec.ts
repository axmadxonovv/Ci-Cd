import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/hello (GET)', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(200)
      .expect('Hello, World!');
  });

  it('/sum (POST) should return sum of numbers', () => {
    return request(app.getHttpServer())
      .post('/sum')
      .send({ a: 5, b: 7 })
      .expect(201)
      .expect({ result: 12 });
  });

  it('/sum (POST) should return 400 on invalid input', () => {
    return request(app.getHttpServer())
      .post('/sum')
      .send({ a: 'a', b: 7 })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
