import { jest } from '@jest/globals';

import supertest from 'supertest';
import app from '../app.js';
import User from '../db/models/User.js';

jest.mock('../db/models/User.js');

describe('POST /api/users/login', () => {
  test('should return status code 200, token, and user object with email and subscription fields', async () => {
    const mockedUser = {
      _id: 'userId',
      email: 'email@mail.com',
      password: '$2b$10$2TE.YoP9G1jPMuxRJmJH7e2b.Xjsk5cZ0eK2nU6jXf9zEJ7lM36qW',
      token: 'fakeToken',
      subscription: 'free',
    };

    User.findOne.mockResolvedValue({ mockedUser });

    const response = await supertest(app).post('/api/users/login').send({
      email: 'email@mail.com',
      password: '00000000',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe('email@mail.com');
    expect(response.body.user.subscription).toBe('free');
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });
});
