require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
const newUserSession = session(app);
const userSession = session(app);
const adminSession = session(app);

const newUser = { pseudo: 'Test', mail: 'Test@test.fr', password: 'Test' };
const newUserLogin = { pseudo: 'Test', password: 'Test' };
const modifiedNewUser = { mail: 'maibidon+tetedecon' };

const registeredUser = { pseudo: process.env.USER_PSEUDO, password: process.env.USER_PW };
const adminUser = { pseudo: process.env.ADMIN_PSEUDO, password: process.env.ADMIN_PW };

describe('API e2e', () => {
  describe('Users routes', () => {
    it('Should register a new user in database', async () => {
      const response = await request.post('/v1/users/register').send({ ...newUser });
      expect(response.status).toBe(201);
      expect(response.text).toContain('User successfully registered, please login to continue.');
    });
    it('Should log the new user', async () => {
      const response = await newUserSession.post('/v1/users/login').send({ ...newUserLogin });
      expect(response.status).toBe(200);
    });
    it('Should update a user with new mail', async () => {
      const response = await newUserSession.put(`/v1/users/modify/${newUser.pseudo}`).send(modifiedNewUser);
      expect(response.status).toBe(201);
    });
    it('Should log a user', async () => {
      const response = await userSession.post('/v1/users/login').send({ ...registeredUser });
      expect(response.status).toBe(200);
    });
    it('Should see its own user infos', async () => {
      const response = await userSession.get('/v1/users/1');
      expect(response.status).toBe(200);
      expect(response.text).toContain('mail');
    });
    it('Should see another user infos', async () => {
      const response = await userSession.get('/v1/users/2');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Yves Signal');
    });
    it('Should log the admin', async () => {
      const response = await adminSession.post('/v1/users/login').send({ ...adminUser });
      expect(response.status).toBe(200);
    });
    it('Should delete the user Test', async () => {
      const response = await adminSession.delete(`/v1/users/${newUser.pseudo}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('User successfuly deleted Test.');
    });
    it('Should not log the deleted user', async () => {
      const response = await request.post('/v1/users/login').send({ ...newUserLogin });
      expect(response.status).toBe(400);
      expect(response.text).toContain('Invalid credentials');
    });
  });
});
