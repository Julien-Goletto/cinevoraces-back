const axios = require('axios');

// `https://api.themoviedb.org/3/list/${listId}?api_key=${TMDB_API_KEY}&language=fr-FR`

const fetchAPI = {
  prefix: 'https://api.themoviedb.org/3',
  /**
   * Function to call the TMDB API  to get a list of 5 top films whith searchQuery
   * @param {searchQuery} String : query from user
   * @param {TMDB_API_KEY} String : user key for API
   * @returns {Array} Movie objects
   */
  async fetchTop5Results(searchQuery, TMDB_API_KEY) {
    const response = await axios.get(`${fetchAPI.prefix}/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&include_adult=false&query=${searchQuery}`);
    return response.data.results.slice(0, 5);
  },

  /**
   * Function to call the TMDB API to get a list of 5 top films whith searchQuery, fully detailled
   * @param {searchQuery} String : query from user
   * @param {TMDB_API_KEY} String : user key for API
   * @returns {Array} Movie objects with properties
   * title, original_title, genres, language, release, runtime,
   * countries, languages, poster, directors, actors
   */
  async fetchTop5ResultsWithDetails(searchQuery, TMDB_API_KEY) {
    const movies = await fetchAPI.fetchTop5Results(searchQuery, TMDB_API_KEY);
    const detailledMoviesPromises = [];
    for (const movie of movies) {
      const detailledMovie = fetchAPI.getMovieDetails(movie, TMDB_API_KEY);
      detailledMoviesPromises.push(detailledMovie);
    }
    const detailledMovies = await Promise.all(detailledMoviesPromises);
    return detailledMovies;
  },

  async fetchTMDBList(listId, TMDB_API_KEY) {
    const results = await axios.get(`${fetchAPI.prefix}/list/${listId}?api_key=${TMDB_API_KEY}&language=fr-FR`);
    return results.data.items;
  },

  async fetchTMDBListWithDetails(listId, TMDB_API_KEY) {
    const results = await fetchAPI.fetchTMDBList(listId, TMDB_API_KEY);
    const detailledMoviesPromises = [];
    for (const movie of results) {
      const detailledMovie = fetchAPI.getMovieDetails(movie, TMDB_API_KEY);
      detailledMoviesPromises.push(detailledMovie);
    }
    const detailledMovie = await Promise.all(detailledMoviesPromises);
    return detailledMovie;
  },

  /**
   * Function to call the TMDB API  to enhance a movie initially fetched
   * @param {movie} Object : movie object
   * @param {TMDB_API_KEY} String : user key for API
   * @returns {movieWithDetails} Movie object with properties :
   * title, original_title, genres, language, release, runtime, countries,
   * languages, poster, directors, actors
   */
  async getMovieDetails(movie, TMDB_API_KEY) {
    const movieDetails = await axios.get(`${fetchAPI.prefix}/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=fr-FR&include_adult=false`);
    const castAndDirectors = await axios.get(`${fetchAPI.prefix}/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}&language=fr-FR&include_adult=false`);
    const { crew } = castAndDirectors.data;
    const { cast } = castAndDirectors.data;
    const movieGenres = movieDetails.data.genres;
    const productCoutries = movieDetails.data.production_countries;
    const spokenLanguages = movieDetails.data.spoken_languages;
    const directors = [];
    crew.forEach((director) => {
      if (director.job === 'Director') {
        directors.push(director.name);
      }
    });
    const casting = [];
    cast.slice(0, 5).forEach((actor) => {
      casting.push(actor.name);
    });
    const genres = [];
    movieGenres.forEach((genre) => {
      genres.push(genre.name);
    });
    const countries = [];
    productCoutries.forEach((country) => {
      countries.push(country.name);
    });
    const languages = [];
    spokenLanguages.forEach((language) => {
      languages.push(language.name);
    });
    const movieWithDetails = {
      french_title: movie.title,
      original_title: movie.original_title,
      genres,
      language: movie.original_language,
      release: movie.release_date,
      runtime: movieDetails.data.runtime,
      countries,
      languages,
      poster_url: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      directors,
      casting,
    };
    return movieWithDetails;
  },
};

module.exports = fetchAPI;
