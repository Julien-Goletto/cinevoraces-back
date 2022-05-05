const axios = require('axios');

/**
 * 
 * Function to call API TMDB to get list of films searchQuery with (title, original_title, genres, language, release, runtime, countries, languages, poster, directors, actors)
 */
async function fetchList(){
  moviesList = [];
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=516d8c12d8c027c62bcfe73ec29e3220&language=fr-FR&include_adult=false&query=fight`);
  for (const movie of response.data.results) {
    const movieDetails = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=516d8c12d8c027c62bcfe73ec29e3220&language=fr-FR&include_adult=false`);
    const castAndDirectors = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=516d8c12d8c027c62bcfe73ec29e3220&language=fr-FR&include_adult=false`);
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
    actors = [];
    cast.slice(0, 5).map((actor) => {
        actors.push(actor.name);
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
    moviesList.push({title: movie.title, original_title: movie.original_title, genres, language: movie.original_language, release: movie.release_date, runtime: movieDetails.data.runtime, countries, languages, poster: movie.poster_path, directors, actors});
  };
  console.log(moviesList);
};

// Get detail of film selected (title, original title, release date, genre name, products country, language spoken, runtime)
// Onject json with alls infos 
// async function fetchMovieDetail(){
//   const response = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=516d8c12d8c027c62bcfe73ec29e3220&language=fr-FR&include_adult=false');
//   console.log(response.data);
// };

// Get casting and director(s) of film selected 
// Onject json from cast and directors
// async function fetchastAndDirectors(){
//   const response = await axios.get('https://api.themoviedb.org/3/movie/550/credits?api_key=319bf20e26c103de9dd61d22f63c0419&language=fr-FR&include_adult=false');

//   console.log(response.data.cast[0].name, response.data.cast[1].name);
// };

fetchList();
