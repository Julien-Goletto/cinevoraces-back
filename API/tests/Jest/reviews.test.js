require('dotenv').config();

const supertest = require('supertest');
// const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);
// const testSession = session(app);

describe('API e2e', () => {
  describe('Reviews routes', () => {
    it('Should be list of all comment from movie id', async () => {
      const response = await request.get('/v1/reviews/3');
      expect(response.status).toBe(200);
      // expect(response.text).toContain('user_id');
    });
  });
});
