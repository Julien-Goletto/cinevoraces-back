require('dotenv').config();

const session = require('supertest-session');
const app = require('../../app');

const userSession = session(app);

const registeredUser = { pseudo: 'Mat-Mat', password: 'e5BkKI_rG5fg_6l!qG1I' };

describe('API e2e', () => {
  describe('refreshTokens route', () => {
    it('Should log a user', async () => {
      const response = await userSession.post('/v1/users/login').send({ ...registeredUser });
      expect(response.status).toBe(200);
    });
    it('Should refresh both access and refresh tokens', async () => {
      const response = await userSession.get('/v1/refreshTokens/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('1');
    });
  });
});
