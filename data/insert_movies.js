const fetchAPI = require('../API/src/external_api/fetchAPI');
require('dotenv').config({path: '../API/.env'});
const {TMDB_API_KEY} = process.env;

const { appendFile } = require('fs/promises');

const searchQuery = 'Fight Club';
const listId = 8201424;


// Module verifications ---------------------------------------------------------------------------------------
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
// End of module verifications ---------------------------------------------------------------------------------------

/**
 * Save movies list de films with all infos from TMDB to JSON file
 */
async function saveMoviesList (){
  const fileName = "moviesList.json";
  const movies = await fetchTMDBListWithDetails();
  const moviesLength = movies.length + 1;
  let index = 1;
  await appendFile(__dirname+"/"+fileName, `{"movies": [`+ `\n`);
  for (const movie of movies){
    index++;
    console.log(`Ajout du film : ${index} `+ movie.french_title);
    if (index != moviesLength){
      await appendFile(__dirname + "/" + fileName,
      JSON.stringify(movie) + `,\n`);
    }
    else{
      await appendFile(__dirname + "/" + fileName,
      JSON.stringify(movie) + `\n`);
    };
  };
  await appendFile(__dirname + "/" + fileName, `]}`);
}

/**
 * Convert an including single quote string into double-single quotes string, format compatible with pgsql requirements
 * @param {string} string 
 * @returns {string} Sanitized string
 */
function sanitizeSingleQuotes(string){
  return string.replace(/'+/g,"''");
};
/**
 * Convert an array to an array format compatible with pgsql requirements
 * @param {Array} list 
 * @returns {string} concatenated array to string for using in pgsql purposes
 */
function formatSimpleListForPgsql (list){
  let sanitizedList = [];
  for (item of list){
    sanitizedList.push(sanitizeSingleQuotes(item));
  };
  return `array['` + `${sanitizedList.join(`','`)}` + `']`;
}
function stringifyPresentation(array){
  return array.join(`\n`);
};

// const chaincharacter = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz0123456789~!@#$%^&*()_-+={}[]/\:;."'<>?`
const chaincharacter = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz0123456789~!@#$%^&*_-+=/:;."<>?`
function createRandomPassWord (chaincharacter,length){
  let password = '';
  for (let i=0 ; i < length; i++){
    password += chaincharacter[Math.floor(Math.random() * chaincharacter.length)];
  }
  return password;
};

// Manual import of already post datas
const presentations = require('./presentation.json');
// Created json archive from saveMoviesList function
const moviesList = require ('./moviesList.json');

/**
 * Returns a list of all authors that post movies
 */
function addAuthors(presentations){
  const authorsList = [];
  for (let i = 1 ; i <= 108; i++){
    if (!authorsList.includes(presentations[i].author)){
      authorsList.push(presentations[i].author);
    }
  }
  let seedingQueries = `INSERT INTO "user" ("pseudo","mail","password") VALUES\n`
  let id = 1;
  for (author of authorsList){
    seedingQueries += `('${author}','mailbidon','${createRandomPassWord(chaincharacter,20)}'),\n`
    id++
  }
  seedingQueries = seedingQueries.slice(0,-2) + `;`
  
  // Writing in a SQL instructions file
  const fileName = `createUsers.sql`
  appendFile(__dirname+"/"+fileName, seedingQueries);
  return {...authorsList};
};

/**
 * Write down all psql instructions to pass, using new_movie function
 */
function prepareDBSeeding(presentations,moviesList) {
  const authors = addAuthors(presentations);
  let seedingQueries = ``;

  for (let i = 1 ; i <= moviesList.movies.length ; i++){
    const movieTitleFromPresentation = presentations[i].title;
    for (const movie of moviesList.movies){
      if (movie.french_title == movieTitleFromPresentation){
        const queryToPush = `SELECT new_movie(`
          +`'${sanitizeSingleQuotes(movie.french_title)}',`
          +`'${sanitizeSingleQuotes(movie.original_title)}',`
          +`'${movie.poster_url}',`
          +`${formatSimpleListForPgsql(movie.directors)},`
          +`'${movie.release}',`
          +`'${movie.runtime}',`
          +`${formatSimpleListForPgsql(movie.casting)},`
          +`'${sanitizeSingleQuotes(stringifyPresentation(presentations[i].presentation))}',`
          +`'${presentations[i].date}',`
          +`${parseInt(Object.keys(authors).find(key => authors[key] === presentations[i].author),10)+1},` // doit être un id
          +`${presentations[i].saison},` // doit être un id
          +`${formatSimpleListForPgsql(movie.genres)},`
          +`${formatSimpleListForPgsql(movie.languages)},`
          +`${formatSimpleListForPgsql(movie.countries)}`
          +`);`
        seedingQueries += queryToPush + `\n`;
      }
    }
  }
  // Writing in a SQL instructions file
  const fileName = `createMovies.sql`;
  appendFile(__dirname+"/"+fileName, seedingQueries);``
  return `L'écriture des fichiers SQL s'est bien passée`;
};

// fetch5TopMoviesFromQuery().then(result => console.log(result));
// fetch5TopMoviesFromQueryWithDetails().then(result => console.log(result));
// fetchTMDBList().then(result => console.log(result));
// fetchTMDBListWithDetails().then(result => console.log(result));
// saveMoviesList();

prepareDBSeeding(presentations,moviesList);