require('dotenv').config();

const supertest = require('supertest');
const session = require('supertest-session');
const app = require('../../app');

const customQuery = 'season_number=3'
                      + '&genres=Comédie|Drame|Thriller'
                      + '&countries=Japan|United+States+of+America|France'
                      + '&runtime=h120'
                      + '&release_date=l1954|h2018';

const customQueryGenres = 'genres=Com%C3%A9die|Drame|Thriller';
const customQueryCountries = 'countries=Japan|United+States+of+America|France';
const customQueryWithUser1 = 'viewed=true&bookmarked=false&liked=true&rating=l4';
const customQueryWithUser2 = 'bookmarked=true';

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

let newMovieId;

const registeredUser = { pseudo: process.env.USER_PSEUDO, password: process.env.USER_PW };
const adminUser = { pseudo: process.env.ADMIN_PSEUDO, password: process.env.ADMIN_PW };

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
      const response = await unloggedSession.get('/v1/movies/search/');
      expect(response.status).toBe(200);
    });
    it('Should get movies corresponding with general filters aggregated', async () => {
      const response = await unloggedSession.get(`/v1/movies/search/${customQuery}`);
      expect(response.status).toBe(200);
    });
    it('Should get movies corresponding to genres filter', async () => {
      const response = await unloggedSession.get(`/v1/movies/search/${customQueryGenres}`);
      expect(response.status).toBe(200);
    });
    it('Should get movies corresponding to countries filter', async () => {
      const response = await unloggedSession.get(`/v1/movies/search/${customQueryCountries}`);
      console.log(response.body);
      expect(response.status).toBe(200);
    });
    it('Should get a specific object from database whith id', async () => {
      const response = await unloggedSession.get('/v1/movies/id/2');
      expect(response.status).toBe(200);
      expect(response.text).toContain('Stalker');
    });
    it('Should get all movie from a particular season', async () => {
      const response = await unloggedSession.get('/v1/movies/search/season_number=2');
      expect(response.status).toBe(200);
      expect(response.text).toContain('La Cité de Dieu');
    });
    it('Should get Free Guy movie object', async () => {
      const response = await adminSession.get(`/v1/movies/search/${customQueryWithUser1}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('Free Guy');
    });
    it('Should get Les Pleins Pouvoirs movie object', async () => {
      const response = await adminSession.get(`/v1/movies/search/${customQueryWithUser2}`);
      expect(response.status).toBe(200);
      expect(response.text).toContain('Les Pleins Pouvoirs');
    });
    it('Should create a new movie in database', async () => {
      const response = await userSession.post('/v1/movies/newmovie').send(newMovie);
      expect(response.status).toBe(201);
    });
    it('Should get the last movie published in database', async () => {
      const response = await adminSession.get('/v1/propositions/pendingPropositions');
      const propositionsArray = response.body;
      newMovieId = propositionsArray[0].id;
      expect(response.status).toBe(200);
    });
    it('Should update the new movie', async () => {
      await adminSession
        .put(`/v1/movies/modify/${newMovieId}`)
        .send(movieInfosToModify);
    });
    it('Should publish movie', async () => {
      const response = await adminSession.put(`/v1/movies/publishing/${newMovieId}`);
      expect(response.status).toBe(200);
    });
    it('Should delete the new added movie', async () => {
      const response = await adminSession.delete(`/v1/movies/${newMovieId}`);
      expect(response.status).toBe(200);
    });
  });
});
