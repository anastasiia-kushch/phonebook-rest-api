import { jest } from '@jest/globals';

import supertest from 'supertest';
import app from '../app.js';

jest.mock('../db/models/User.js');

afterAll(() => {
  supertest((exit(1)))
});

describe('POST /api/users/login', () => {
  test('should return status code 200, token, and user object with email and subscription fields', async () => {


    const response = await supertest(app).post('/api/users/login').send({
      "email": "email@mail.com",
      "password": "00000000",
    });

    console.log('response', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.email).toBe('email@mail.com');
    expect(response.body.subscription).toBe('starter');
    expect(typeof response.body.email).toBe('string');
    expect(typeof response.body.subscription).toBe('string');
  });
});
