const client = require('../dbclient');
const debug = require('debug')("Movie_DataMapper");
const APIError = require('../../Errors/APIError');
const { addNewMovie } = require('../../controllers/movies.controller');

const moviesDataMapper = {
  /**
   * Get all movies in database
   * @returns {ARRAY} Game objects
   * @throws {APIError} If db is empty
   */
  async getAllMovies() {
    const query = 'SELECT * FROM movie';
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No movie saved yet", 404);
    };
    return results.rows;
  },

  async getMovieByID(movieId) {
    const query =  {
      text: 'SELECT * FROM movie WHERE id=$1',
      values: [movieId]
    };
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("No movie saved yet", 404);
    };
    return results.rows;
  },

  async addNewMovie(movie){
    const query = {
      text: `SELECT new_movie($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      values: [movie.title, movie.original_title, movie.poster_url, movie.directors, movie.release_date, movie.runtime, movie.casting, movie.presentation, movie.publishing_date, movie.user_id, movie.saison_id, movie.movie_genres, movie.movies_languages, movies_countries]
    };
    await client.query(query);
    return 'Movie added in database';
  }
};

module.exports = moviesDataMapper;