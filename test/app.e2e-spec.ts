import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { send } from 'process';

describe('ProfileController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    
  });

  it('/profile (GET) - returns list of profile', async () => {
    const res = await request(app.getHttpServer()).get('/profile');
    expect(res.statusCode).toBe(200)
  });


  it('/users (GET) - returns list of users', async () => {
    const res = await request(app.getHttpServer()).get('/users');
    expect(res.statusCode).toBe(200)
  });

  it('/users (GET) - 404', async () => {
    const res = await request(app.getHttpServer()).get('/user');
    expect(res.statusCode).toBe(404)
  });

  it('/login (POST) - login user', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login');
    send({
      "email": "user9@mail.com",
      "password": "user9@mail.com"
    })
    expect(res.statusCode).toEqual(500)
    expect([{
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI5QG1haWwuY29tIiwiaWQiOjE5LCJpYXQiOjE2ODEzMDc5MDAsImV4cCI6MTY4MTM5NDMwMH0.KMk7bu_USs7yNphXKG2QMtcxegj_EkhZ1IN4XAF2YDA"
    }])
  });

  it('/login (POST) - login unexited user', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login');
    send({
      "email": "user8@mail.com",
      "password": "user8@mail.com"
    })
    expect(res.statusCode).toEqual(500)
    expect([{ "message": "Некоректный email или password"
    }])
  });

  it('/registration (POST) - registration new user', async () => {
    const res = await request(app.getHttpServer()).post('/auth/registration');
    send({
      "email": "user10@mail.com",
      "password": "user10@mail.com"
    })
    expect(res.statusCode).toEqual(500)
    expect([{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxMEBtYWlsLmNvbSIsImlkIjoyMCwiaWF0IjoxNjgxMzA5NDk2LCJleHAiOjE2ODEzOTU4OTZ9.jlSl8_wLnDCPXdEGVFncC9cgFId4k0oCTQOrH2CmfUc"
    }])
  });

  it('/registration (POST) - registration already existed user', async () => {
    const res = await request(app.getHttpServer()).post('/auth/registration');
    send({
      "email": "user10@mail.com",
      "password": "user10@mail.com"
    })
    expect(res.statusCode).toEqual(500)
    expect([{ "statusCode": 400,
              "message": "Пользователь с таким email существует"
    }])
  });
});