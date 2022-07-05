const client = require('../dbclient');
const filtersQuery = require('../../modules/filterQuery.module');
const APIError = require('../../Errors/APIError');

const moviesDataMapper = {

  async getMovies(filters, userId) {
    let query;
    if (!filters) {
      query = 'SELECT * FROM movies_infos WHERE is_published = true';
    } else {
      query = filtersQuery.writeSQLFilters(filters, userId);
    }
    console.log(query);
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError('Aucun film ne correspond à la recherche.', '', 404);
    }
    return results.rows;
  },

  async getMovieByID(movieId) {
    const query = {
      text: 'SELECT * FROM movies_infos WHERE id=$1 AND is_published = true',
      values: [movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Ce film n'est pas enregistré en base, ou pas encore publié.", '', 404);
    }
    return results.rows;
  },

  async getLastMovie() {
    const query = `SELECT * FROM last_season_movies WHERE is_published = true
                    ORDER BY id DESC
                    LIMIT 1`;
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Aucun film n'a été publié.", '', 404);
    }
    return results.rows[0];
  },

  async getAllMoviesFromLastSeason() {
    const query = 'SELECT * FROM last_season_movies WHERE is_published = true';
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Il n'y a pas de film dans la dernière saison.", '', 404);
    }
    return results.rows;
  },

  async getAllMoviesBySeason(seasonId) {
    const query = {
      text: 'SELECT * FROM movies_infos WHERE season_number=$1 AND is_published = true',
      values: [seasonId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Il n'y a pas de film publié dans cette saison.", '', 404);
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
      throw new APIError('Movie already here', '', 400);
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
      throw new Error("Le film n'a pas pu être enregistré. Peut-être est-il déjà présent ?", '', 400);
    }
    return 'Film ajouté en base';
  },

  async updateMovie(movieId, movieInfos) {
    const movieInfosToModify = movieInfos;
    let query = {
      text: 'SELECT * FROM movie WHERE id=$1;',
      values: [movieId],
    };
    let results = await client.query(query);
    if (!results) {
      throw new Error("Le film demandé n'existe pas en base", '', 404);
    }
    query = {
      text: 'UPDATE movie SET ',
      values: [],
    };
    let i = 1;
    for (const key of Object.keys(movieInfosToModify)) {
      query.text += `"${key}" = $${i},`;
      query.values.push(movieInfosToModify[key]);
      i += 1;
    }
    query.text = query.text.slice(0, -1);
    query.text += ` WHERE id=$${i}`;
    query.values.push(movieId);
    console.log(query);
    results = await client.query(query);
    if (!results) {
      throw new Error("Le film n'a pas pu être modifié.", '', 400);
    }
    return 'Les données du film ont été modifiées.';
  },

  async deleteMovie(movieId) {
    const query = {
      text: 'DELETE FROM movie WHERE id=$1',
      values: [movieId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("Le film demandé n'existe pas en base.", '', 404);
    }
    return `Le film ${movieId} a bien été supprimé.`;
  },

  async publishMovie(movieId, isPublished) {
    let query = {
      text: 'SELECT * FROM movie WHERE id=$1;',
      values: [movieId],
    };
    const result = await client.query(query);
    if (!result) {
      throw new Error("Le film demandé n'existe pas en base.", '', 404);
    }
    query = {
      text: 'UPDATE movie SET is_published=$1 WHERE id=$2',
      values: [isPublished, movieId],
    };
    await client.query(query);
    return 'Le film est publié.';
  },
};

module.exports = moviesDataMapper;
