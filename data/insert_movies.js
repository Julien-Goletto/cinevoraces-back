const fetchAPI = require('../API/src/external_api/fetchAPI');
require('dotenv').config({path: '../API/.env'});
const {TMDB_API_KEY} = process.env;

const searchQuery = 'Fight Club';
const listId = 8201424;

async function fetch5TopMoviesFromQuery (){
  const movies = await fetchAPI.fetchTop5Results(searchQuery,TMDB_API_KEY);
  return movies;
}

async function fetch5TopMoviesFromQueryWithDetails() {
  const movies = await fetchAPI.fetchTop5ResultsWithDetails(searchQuery,TMDB_API_KEY);
  return movies;
}
async function fetchTMDBList() {
  const movies = await fetchAPI.fetchTMDBList(listId,TMDB_API_KEY);
  return movies;
}
async function fetchTMDBListWithDetails() {
  const movies = await fetchAPI.fetchTMDBListWithDetails(listId,TMDB_API_KEY);
  return movies;
}

// fetch5TopMoviesFromQuery().then(result => console.log(result));
// fetch5TopMoviesFromQueryWithDetails().then(result => console.log(result));
// fetchTMDBList().then(result => console.log(result));
fetchTMDBListWithDetails().then(result => console.log(result));
