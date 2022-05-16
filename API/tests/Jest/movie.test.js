require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const newMovie = {
  french_title: 'In the Mood for Love',
  original_title: 'In the Mood for Love',
  poster_url: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mqa8tOF3YnTy0ChgnviSg2C6gYQ.jpg',
  directors: ['Wong Kar-wai'],
  release_date: '2000-11-08',
  runtime: 98,
  casting: ['Tony Leung Chiu-wai', 'Maggie Cheung', 'Rebecca Pan', 'Kelly Lai Chen', 'Siu Ping-lam'],
  presentation: 'Et si on parlait du meilleur film du monde ?',
  publishing_date: '2022-09-08',
  user_id: 2,
  season_id: 3,
  movie_genres: ['Drame', 'Romance'],
  movie_languages: ['Cantonese'],
  movie_countries: ['Hong Kong', 'France'],
};
const movieInfosToModify = {
  runtime: 102,
  presentation: 'Le meilleur film de tous les temps, tout simplement. Tout est dit.',
};

const registeredUser = { pseudo: 'Mat-Mat', password: 'e5BkKI_rG5fg_6l!qG1I' };
const adminUser = { pseudo: 'Yves Signal', password: 'K_foDAInGDeXiN~bt/Bx' };

const unloggedSession = supertest(app);
const userSession = session(app);
const adminSession = session(app);

describe('API e2e', () => {
  describe('Movies routes', () => {
    beforeAll(async () => {
      await userSession.post('/v1/users/login').send(registeredUser);
      await adminSession.post('/v1/users/login').send(adminUser);
    });
    it('Should get all movies in database', async () => {
      const response = await unloggedSession.get('/v1/movies');
      expect(response.status).toBe(200);
    });
    it('Should get the last movie', async () => {
      const response = await unloggedSession.get('/v1/movies/lastmovie');
      expect(response.status).toBe(200);
    });
    it('Should get all movies from last season', async () => {
      const response = await unloggedSession.get('/v1/movies/lastseason');
      expect(response.status).toBe(200);
    });
    it('Should get a specific object from database whith id', async () => {
      const response = await unloggedSession.get('/v1/movies/2');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Stalker');
    });
    it('Should get all movie from a particular season', async () => {
      const response = await unloggedSession.get('/v1/movies/season/2');
      expect(response.status).toBe(200);
      expect(response.text).toContain('La Cité de Dieu');
    });
    it('Should create a new movie in database', async () => {
      const response = await userSession.post('/v1/movies/newmovie').send(newMovie);
      expect(response.status).toBe(201);
    });
    // it('Should update the new movie', async () => {
    //   const response = await adminSession.put(`/v1/movies/modify/${newMovie.french_title}`).send(movieInfosToModify);
    //   console.log(response);
    //   expect(response.status).toBe(201);
    // });
    it('Should delete the new added movie', async () => {
      const response = await adminSession.delete(`/v1/movies/${newMovie.french_title}`);
      expect(response.status).toBe(200);
    });
  });
});
