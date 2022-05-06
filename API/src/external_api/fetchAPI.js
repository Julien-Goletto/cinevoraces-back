const axios = require('axios');

const fetchList = {
  /**
   * Function to call  3 times per movie the API TMDB to get a list of 5 top films whith searchQuery
   * @param {searchQuery} String : query from user
   * @param {TMDB_API_KEY} String : user key for API
   * @returns {Array} Movie object with properties (title, original_title, genres, language, release, runtime, countries, languages, poster, directors, actors)
   */
  async fetchList(searchQuery, TMDB_API_KEY){
    let moviesListPromises = [];
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&include_adult=false&query=${searchQuery}`);
    const shortenedResponse = response.data.results.slice(0,5);
    for (const movie of shortenedResponse) {
      const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=fr-FR&include_adult=false`);
      const castAndDirectors = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}&language=fr-FR&include_adult=false`);
      const crew = castAndDirectors.data.crew;
      const cast = castAndDirectors.data.cast;
      const movieGenres = movieDetails.data.genres;
      const productCoutries = movieDetails.data.production_countries;
      const spokenLanguages = movieDetails.data.spoken_languages;
      directors = [];
      crew.map((director) => {
        if (director.job === 'Director') {
          directors.push(director.name);
        };
      });
      casting = [];
      cast.slice(0, 5).map((actor) => {
          casting.push(actor.name);
      });
      genres = [];
      movieGenres.map((genre) => {
        genres.push(genre.name);
      });
      countries = [];
      productCoutries.map((country) => {
        countries.push(country.name);
      });
      languages = [];
      spokenLanguages.map((language) => {
        languages.push(language.name);
      });
      moviesListPromises.push({french_title: movie.title, original_title: movie.original_title, genres, language: movie.original_language, release: movie.release_date, runtime: movieDetails.data.runtime, countries, languages, poster_url: movie.poster_path, directors, casting});
    };
    const moviesList = await Promise.all(moviesListPromises);
    return moviesList;
  },
};

module.exports = fetchList;
