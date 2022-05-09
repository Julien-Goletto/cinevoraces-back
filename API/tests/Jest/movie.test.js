require('dotenv').config();

const supertest = require('supertest');
const app = require('../../app');
const request = supertest(app);

const session = require('supertest-session');
let testSession = session(app);

describe('Movies roads', ()=>{
  it('Should get all movies in database', async ()=> {
    const response = await request.get('/v1/movies');
    expect(response.status).toBe(200);
  });
  it('Should get a object from on movie in database whith id', async ()=> {
    const movieId= 2;
    const response = await request.get(`/v1/movies/${movieId}`);
    expect(response.status).toBe(200);
    expect(response.text).toBe("[{\"id\":2,\"french_title\":\"Stalker\",\"original_title\":\"Stalker\",\"poster_url\":\"poster_url\",\"directors\":[\"Andrei Tarkovsky\"],\"release_date\":\"1979-04-16T22:00:00.000Z\",\"runtime\":162,\"casting\":[\"Alisa Freyndlikh\",\"Alexandr Kaydanovskiy\",\"Anatoliy Solonitsyne\",\"Nikolay Grinko\",\"Natalya Abramova\"],\"presentation\":\"Un guide conduit deux hommes, l'un professeur et l'autre écrivain, à travers une zone connue comme la « chambre », afin d'exaucer tous leurs vœux.\",\"is_published\":true,\"publishing_date\":\"2021-12-05T23:00:00.000Z\",\"user_id\":1,\"season_id\":2,\"createAt\":\"2022-05-09T09:39:47.322Z\",\"updatedAt\":null}]");
  });
});