require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
const userSession = session(app);

const registeredUser = { pseudo: 'Mat-Mat', password: 'e5BkKI_rG5fg_6l!qG1I' };

describe('API e2e', () => {
  describe('Movies routes', () => {
    it('Should get all movies in database', async () => {
      const response = await request.get('/v1/movies');
      expect(response.status).toBe(200);
    });
    it('Should get all movies from last season', async () => {
      const response = await request.get('/v1/movies/lastseason');
      expect(response.status).toBe(200);
    });
    it('Should get a object from on movie in database whith id', async () => {
      const response = await request.get('/v1/movies/2');
      expect(response.status).toBe(200);
    });
    it('Should get all movie from a particular season', async () => {
      const response = await request.get('/v1/movies/season/2');
      expect(response.status).toBe(200);
    });
    it('Should log a user', async () => {
      const response = await userSession.post('/v1/users/login').send({ ...registeredUser });
      expect(response.status).toBe(200);
    });
  });
});
