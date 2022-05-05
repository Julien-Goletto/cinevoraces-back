const axios = require('axios');


// Get list of films in french with query (MovieId)
async function fetchList(){
  const response = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=319bf20e26c103de9dd61d22f63c0419&language=fr-FR&query=fight');
  console.log(response.data);
};

// Get detail of film selected (title, original title, release date, genre name, products country, language spoken, runtime)
async function fetchMovieDetail(){
  const response = await axios.get('https://api.themoviedb.org/3/movie/550?api_key=319bf20e26c103de9dd61d22f63c0419&language=fr-FR');
  console.log(response.data);
};

// Get casting and director(s) of film selected 
async function fetchastAndDirectors(){
  const response = await axios.get('https://api.themoviedb.org/3/movie/550/credits?api_key=319bf20e26c103de9dd61d22f63c0419&language=fr-FR');
  console.log(response.data);
};