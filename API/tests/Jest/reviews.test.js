require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
const testSession = session(app);

const registeredUser = { pseudo: 'Mat-Mat', password: 'e5BkKI_rG5fg_6l!qG1I' };
const createComment = { comment: 'Coucou' };
const updateComment = { comment: 'Recoucou' };

describe('API e2e', () => {
  describe('Reviews routes', () => {
    it('Should be list of all comment from movie id', async () => {
      const response = await request.get('/v1/reviews/3');
      expect(response.status).toBe(200);
      expect(response.text).toContain('user_id');
    });
    it('Should log a user', async () => {
      const response = await testSession.post('/v1/users/login').send({ ...registeredUser });
      expect(response.status).toBe(200);
    });
    it('Should be all review from on user in on movie', async () => {
      const response = await testSession.get('/v1/reviews/1/3');
      expect(response.status).toBe(200);
      expect(response.text).toContain('user_id');
    });
    it('Should be create a new comment on movie', async () => {
      const response = await testSession.post('/v1/reviews/1/10').send({ ...createComment });
      expect(response.status).toBe(200);
    });
    it('Should be modificate a comment on movie', async () => {
      const response = await testSession.put('/v1/reviews/1/9').send({ ...updateComment });
      expect(response.status).toBe(200);
    });
  });
});
