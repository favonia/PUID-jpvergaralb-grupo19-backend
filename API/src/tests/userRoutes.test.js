const request = require('supertest');
const app = require('../app');
const db = require('../../models');
const {
  mockUserId,
  correctMockUser,
  incorrectMockUser,
} = require('./utils/userRoutes.util');

const User = db.user;

describe('Users API - General Cases', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
  });

  it('should return a user', async () => {
    const res = await request(app).get(`/users/${mockUserId}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should post a user', async () => {
    const res = await request(app).post('/users').send(
      correctMockUser,
    );
    expect(res.statusCode).toEqual(201);
  });
});

describe('Users API - Error Cases', () => {
  it('should return 500 trying to get a user by its id', async () => {
    User.findAll = jest.fn(() => {
      throw new Error('Database error');
    });
    const res = await request(app).get(`/users/${mockUserId}`);
    expect(res.statusCode).toEqual(500);
  });

  it('should return 500 trying to get all users', async () => {
    User.findAll = jest.fn(() => {
      throw new Error('Database error');
    });
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(500);
  });

  it('should return 500 trying to post a user', async () => {
    const res = await request(app).post('/users').send(incorrectMockUser);
    expect(res.statusCode).toEqual(500);
  });
});
