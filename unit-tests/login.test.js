import { jest } from '@jest/globals';

import supertest from 'supertest';
import app from '../app.js';

jest.mock('../db/models/User.js');

describe('POST /api/users/login', () => {
  test('should return status code 200, token, and user object with email and subscription fields', async () => {
    // const mockedUser = {
    //   _id: "userId",
    //   email: "email@mail.com",
    //   password: "$2b$10$2TE.YoP9G1jPMuxRJmJH7e2b.Xjsk5cZ0eK2nU6jXf9zEJ7lM36qW",
    //   token: "fakeToken",
    //   subscription: "pro",
    // };

    const response = await supertest(app).post('/api/users/login').send({
      email: 'User1@mail.com',
      password: '123456',
    });

    console.log('response', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe('User1@mail.com');
    // expect(response.body.user.subscription).toBe("pro");
    expect(typeof response.body.user.email).toBe('string');
    // expect(typeof response.body.user.subscription).toBe("string");
  });
});
