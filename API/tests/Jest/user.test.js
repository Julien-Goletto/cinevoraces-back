require('dotenv').config();

const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);

// const session = require('supertest-session');

// const testSession = session(app);

const user = { pseudo: 'Test3', mail: 'Test3@test.fr', password: 'Test' };
// const registeredUser = { pseudo: 'Test4', mail: 'Test4@test.fr', password: 'test' };
// const adminUser = { pseudo: 'Test5', mail: 'Test5@test.fr', password: 'test' };

describe('Users roads', () => {
  it('Should register a new user in database', async () => {
    const response = await request.post('/v1/users/register').send({ ...user });
    expect(response.status).toBe(201);
    expect(response.text).toContain('User successfully registered, please login to continue.');
  });
  it('Should be a objet user selected', async () => {
    const response = await request.get('/v1/users/1');
    expect(response.status).toBe(200);
  });
  it('Should return an array with all registered users', async () => {
    const response = await request.get('/v1/users/');
    expect(response.status).toBe(200);
  });
});
