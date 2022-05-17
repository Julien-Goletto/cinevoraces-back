require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
const userSession = session(app);

const registeredUser = { pseudo: 'Mat-Mat', password: 'e5BkKI_rG5fg_6l!qG1I' };

describe('API e2e', () => {
  describe('Metrics routes', () => {
    beforeAll(async () => {
      await userSession.post('/v1/users/login').send(registeredUser);
    });
    it('Should get general metrics', async () => {
      const response = await request.get('/v1/metrics/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('seasons_count');
    });
    it('Should get all individual metrics', async () => {
      const response = await userSession.get('/v1/metrics/all');
      expect(response.status).toBe(200);
      expect(response.text).toContain('proposed_movies_count');
    });
    it('Should get individual metrics for user n°1', async () => {
      const response = await userSession.get('/v1/metrics/1');
      expect(response.status).toBe(200);
      expect(response.text).toContain('proposed_movies_count');
    });
  });
});
