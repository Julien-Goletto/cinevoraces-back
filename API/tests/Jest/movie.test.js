require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const request = supertest(app);

const testSession = session(app);

describe('Movies roads', () => {
  it('Should get all movies in database', async () => {
    const response = await testSession.get('/v1/movies');
    expect(response.status).toBe(200);
  });
  it('Should get a object from on movie in database whith id', async () => {
    const response = await request.get('/v1/movies/2');
    expect(response.status).toBe(200);
  });
});
