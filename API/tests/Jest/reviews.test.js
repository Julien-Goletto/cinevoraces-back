require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
const testSession = session(app);

const registeredUser = { pseudo: process.env.USER_PSEUDO, password: process.env.USER_PW };
const updateReview = { bookmarked: true, comment: 'Recoucou' };

describe('API e2e', () => {
  describe('Reviews routes', () => {
    it('Should be list of all comment from movie id', async () => {
      const response = await request.get('/v1/reviews/3/comments');
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
    it('Should be create a new empty review on a movie', async () => {
      const response = await testSession.post('/v1/reviews/1/13');
      expect(response.status).toBe(201);
    });
    it('Should be modificate a review on a movie', async () => {
      const response = await testSession.put('/v1/reviews/1/13').send({ ...updateReview });
      expect(response.status).toBe(201);
    });
    it('Should be delete a comment on a movie', async () => {
      const response = await testSession.delete('/v1/reviews/1/13/comment');
      expect(response.status).toBe(200);
    })
    it('Should be delete a review on a movie', async () => {
      const response = await testSession.delete('/v1/reviews/1/13');
      expect(response.status).toBe(200);
    });
  });
});
