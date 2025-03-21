import request from 'supertest';
import app from '../server';

describe('Auth Endpoints', () => {
  let token: string;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testUser', password: 'testPass', email: 'test@example.com' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should not allow duplicate registration', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ username: 'testUser', password: 'testPass', email: 'test@example.com' });
    expect(res.statusCode).toEqual(409);
    expect(res.body.message).toBe('User already exists');
  });

  it('should login the user and return a token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ username: 'testUser', password: 'testPass' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should access the protected profile endpoint', async () => {
    const res = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app)
      .get('/auth/profile');
    expect(res.statusCode).toEqual(401);
  });
});
