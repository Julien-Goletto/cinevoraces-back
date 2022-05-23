require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
const userSession = session(app);
const newUserSession = session(app);
const adminSession = session(app);

const adminUser = { pseudo: process.env.ADMIN_PSEUDO, password: process.env.ADMIN_PW };
const registeredUser = { pseudo: process.env.USER_PSEUDO, password: process.env.USER_PW };
const newUser = { pseudo: 'Test', mail: 'Test@test.fr', password: 'Test' };
const newUserLogin = { pseudo: 'Test', password: 'Test' };
let newUserId;

describe('API e2e', () => {
  describe('Metrics routes', () => {
    beforeAll(async () => {
      await userSession.post('/v1/users/login').send(registeredUser);
      await request.post('/v1/users/register').send(newUser);
      const response = await newUserSession.post('/v1/users/login').send(newUserLogin);
      newUserId = response.body.id;
      console.log(newUserId);
      await adminSession.post('/v1/users/login').send(adminUser);
    });
    it('Should get general metrics', async () => {
      const response = await request.get('/v1/metrics/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('seasons_count');
    });
    it('Should get all individual metrics as admin', async () => {
      const response = await adminSession.get('/v1/metrics/all');
      expect(response.status).toBe(200);
      expect(response.text).toContain('propositions_count');
    });
    it('Should get individual metrics for user n°1 as user n°1', async () => {
      const response = await userSession.get('/v1/metrics/1');
      console.log(response.body);
      expect(response.status).toBe(200);
      expect(response.text).toContain('propositions_count');
    });
    it('Should get individual metrics for new as new user', async () => {
      const response = await newUserSession.get(`/v1/metrics/${newUserId}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('propositions_count');
    });
    afterAll(async () => {
      await adminSession.delete(`/v1/users/${newUser.pseudo}`);
    });
  });
});
