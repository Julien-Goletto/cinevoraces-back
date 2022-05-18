const client = require('../dbclient');
const APIError = require('../../Errors/APIError');

const moviesDataMapper = {
  /**
   * Get all movies in database
   * @returns {ARRAY} Game objects
   * @throws {APIError} If db is empty
   */
  async getAllMovies() {
    const query = 'SELECT * FROM movies_infos';
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No movies saved yet', 404);
    }
    return results.rows;
  },

  async getMovieByID(movieId) {
    const query = {
      text: 'SELECT * FROM movies_infos WHERE id=$1',
      values: [movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No movie saved yet', 404);
    }
    return results.rows;
  },
  async getLastMovie() {
    const query = 'SELECT * FROM public.last_season_movies';
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No movies saved yet', 404);
    }
    return results.rows;
  },
  async getAllMoviesFromLastSeason() {
    const query = 'SELECT * FROM public.last_season_movies';
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No movies saved yet', 404);
    }
    return results.rows;
  },
  async getAllMoviesBySeason(seasonId) {
    const query = {
      text: 'SELECT * FROM movies_infos WHERE season_number=$1',
      values: [seasonId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('No movies saved yet', 404);
    }
    return results.rows;
  },
  async addNewMovie(movie) {
    let query = {
      text: 'SELECT * FROM movie WHERE french_title=$1',
      values: [movie.french_title],
    };
    let results = await client.query(query);
    if (results.rowCount) {
      throw new APIError('Movie already here', 404);
    }
    query = {
      text: 'SELECT new_movie($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
      values: [movie.french_title, movie.original_title, movie.poster_url, movie.directors,
        movie.release_date, movie.runtime, movie.casting, movie.presentation, movie.publishing_date,
        movie.user_id, movie.season_id, movie.movie_genres, movie.movie_languages,
        movie.movie_countries],
    };
    results = await client.query(query);
    if (!results.rowCount) {
      throw new Error("Le film n'a pas pu être enregistré.");
    }
    return 'Movie added in database';
  },
  async updateMovieByTitle(movieTitle, movieInfos) {
    const movieInfosToModify = movieInfos;
    let query = {
      text: 'SELECT * FROM movie WHERE french_title=$1;',
      values: [movieTitle],
    };
    let results = await client.query(query);
    if (!results) {
      throw new Error("Le film demandé n'existe pas en base");
    }
    query = {
      text: 'UPDATE movie SET ',
      values: [],
    };
    let i = 0;
    for (const key of Object.keys(movieInfosToModify)) {
      query.text += `"${key}" = $${i},`;
      query.values.push(userToModify[key]);
      i += 1;
    }
    query.text = query.text.slice(0, -1);
    query.text += ` WHERE id=$${i}`;
    query.values.push(movieTitle);
    results = await client.query(query);
    if (!results) {
      throw new Error("Le film n'a pas pu être modifié.");
    }
    return 'Les données du film ont été modifiées.';
  },
  async deleteMovieByTitle(movieTitle) {
    const query = {
      text: 'DELETE FROM movie WHERE french_title=$1',
      values: [movieTitle],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('Le film demandé nexiste pas en base.', 404);
    }
    return `Le film ${movieTitle} a bien été supprimé.`;
  },
};

module.exports = moviesDataMapper;
