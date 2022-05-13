require('dotenv').config();

const supertest = require('supertest');
// const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);

// const testSession = session(app);

describe('API e2e', () => {
  // beforeEach(function(done){
  //   testSession.post('/v1/users/login')
  //   .send({pseudo: "Tutu",password: "test"})
  //   .expect(200)
  //   .end(function (err) {
  //     if (err) return done(err);
  //     authenticatedSession = testSession;
  //     return done();
  //   });
  // });
  describe('Metrics routes', () => {
    it('Should get general metrics', async () => {
      const response = await request.get('/v1/metrics/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('seasons_count');
    });
    it('Should get all individual metrics', async () => {
      const response = await request.get('/v1/metrics/all');
      expect(response.status).toBe(200);
      expect(response.text).toContain('proposed_movies_count');
    });
    it('Should get general metrics', async () => {
      const response = await request.get('/v1/metrics/1');
      expect(response.status).toBe(200);
      expect(response.text).toContain('proposed_movies_count');
    });
  });
});
