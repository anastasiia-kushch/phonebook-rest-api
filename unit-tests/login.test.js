//відповідь повина мати:
// • статус-код 200
// • токен
// • об'єкт user з 2 полями email и subscription з типом даних String
import jest from '@jest/globals'

import supertest from 'supertest';
import app from '../app.js';
import User from '../db/models/User.js';

jest.mock('../db/models/User.js')

describe('login', () => {
  test('should return status code 200, token, and user object with email and subscription fields', async () => {
    const mockedUser = {
      _id: 'userId',
      email: 'email@mail.com',
      password: '00000000',
      token: 'fakeToken',
      subscription: 'pro',
    };

    await User.findOne.mockResolveVajue(mockedUser);

    const response = await supertest(app)
      .post('/api/users/login')
      .send({ email: 'email@mail.com', password: '00000000' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    exprect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('email@mail.com');
    expect(response.body.user.subscription).toBe('pro');
    expect(typeof response.body.user.email).toBe('string');
    expect(typeof response.body.user.subscription).toBe('string');
  });
});
