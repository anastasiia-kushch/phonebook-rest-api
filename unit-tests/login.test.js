// import { jest } from '@jest/globals';
// import mongoose from "mongoose";
// import supertest from 'supertest';
// import app from '../app.js';


// const DB_URI = process.env.DB_URI
// jest.mock('../db/models/User.js');

// describe('POST /api/users/login', () => {
//   afterAll(async () => {
//     await mongoose.disconnect(DB_URI);
//   })
//   test('should return status code 200, token, and user object with email and subscription fields', async () => {

//     const response = await supertest(app).post('/api/users/login').send({
//       "email": "email@mail.com",
//       "password": "00000000",
//     });

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('token');
//     expect(response.body.email).toBe('email@mail.com');
//     expect(response.body.subscription).toBe('starter');
//     expect(typeof response.body.email).toBe('string');
//     expect(typeof response.body.subscription).toBe('string');
//   });
// });
