const fetchAPI = require('../API/src/external_api/fetchAPI');
require('dotenv').config({path: '../API/.env'});
const {TMDB_API_KEY} = process.env;

const { appendFile } = require('fs/promises');

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
  // return (await Promise.all(movies));
  return movies;
}
/**
 * Sauvegarde le listing de films aux infos complètes dans un JSON
 */
async function saveMoviesList (){
  const fileName = "moviesList.json";
  const movies = await fetchTMDBListWithDetails();
  const moviesLength = movies.length;
  await appendFile(__dirname+"/"+fileName, `{"movies": [`+ `\n`);
  let index = 1;
  for (const movie of movies){
    console.log(`Ajout du film ${index}: `+ movie.french_title);
    if (index != moviesLength){
      await appendFile(__dirname + "/" + fileName, `{"${index}": ` + `\n`
      + JSON.stringify(movie) + `},` + `\n`);
    }
    else{
      await appendFile(__dirname + "/" + fileName, `{"${index}": ` + `\n`
      + JSON.stringify(movie) + `}` + `\n`);
    }
    index++;
  };

  await appendFile(__dirname + "/" + fileName, `]}`);
}

// fetch5TopMoviesFromQuery().then(result => console.log(result));
// fetch5TopMoviesFromQueryWithDetails().then(result => console.log(result));
// fetchTMDBList().then(result => console.log(result));
// fetchTMDBListWithDetails().then(result => console.log(result));
saveMoviesList();
