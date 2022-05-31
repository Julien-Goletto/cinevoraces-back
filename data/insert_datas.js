const fetchAPI = require('../API/src/external_api/fetchAPI');
require('dotenv').config({path: '../API/.env'});
const {TMDB_API_KEY} = process.env;

const { appendFile } = require('fs/promises');
const bcrypt = require('bcrypt');

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
const chaincharacter = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz0123456789~!@#$%^*_-+=/:;.?`
async function createRandomPassWord (chaincharacter,length){
  let password = '';
  const salt = await bcrypt.genSalt(10);
  for (let i=0 ; i < length; i++){
    password += chaincharacter[Math.floor(Math.random() * chaincharacter.length)];
  }
  console.log(password);
  password = await bcrypt.hash(password, salt);
  return password;
};

// Manual import of already post datas
const presentations = require('./presentation.json');
// Created json archive from saveMoviesList function
const moviesList = require ('./moviesList.json');

/**
 * Returns a list of all authors that post movies
 */
async function addAuthors(presentations){
  const authorsList = [];
  for (let i = 1 ; i <= Object.keys(presentations).length; i++){
    if (!authorsList.includes(presentations[i].author)){
      authorsList.push(presentations[i].author);
    }
  }
  let seedingQueries = `INSERT INTO "user" ("pseudo","mail","password") VALUES\n`
  let id = 1;
  for (author of authorsList){
    const hashedPw = await createRandomPassWord(chaincharacter,20);
    seedingQueries += `('${sanitizeSingleQuotes(author)}', 'mailbidon${id}' ,'${hashedPw}'),\n`
    id++
  }
  seedingQueries = seedingQueries.slice(0,-2) + `;`
  
  // Writing in a SQL instructions file
  const fileName = `createUsers.sql`
  appendFile(__dirname+"/"+fileName, seedingQueries);
  return authorsList;
};

/**
 * Write down all psql instructions to pass, using new_movie function
 * Corected with an await for addAuthors calling
 */
async function prepareDBSeeding(presentations,moviesList) {
  const authors = await addAuthors(presentations);
  console.log(authors);
  console.log(`Nombre de films présentés : ${Object.keys(presentations).length}` + `\n`
                + `Nombre de films listés : ${moviesList.movies.length}`)
  let seedingQueries = ``;
  for (let i = 1 ; i <= moviesList.movies.length ; i++){
    const movieTitleFromPresentation = presentations[i].title;
    let queryToPush='';
    for (const movie of moviesList.movies){
      if (movie.french_title == movieTitleFromPresentation){
        queryToPush += `SELECT new_movie(`
          +`'${sanitizeSingleQuotes(movie.french_title)}',`
          +`'${sanitizeSingleQuotes(movie.original_title)}',`
          +`'${movie.poster_url}',`
          +`${formatSimpleListForPgsql(movie.directors)},`
          +`'${movie.release}',`
          +`'${movie.runtime}',`
          +`${formatSimpleListForPgsql(movie.casting)},`
          +`'${sanitizeSingleQuotes(stringifyPresentation(presentations[i].presentation))}',`
          +`'${presentations[i].date}',`
          +`${parseInt(Object.keys(authors).find(key => authors[key] === presentations[i].author),10)+1},`
          +`${presentations[i].saison},`
          +`${formatSimpleListForPgsql(movie.genres)},`
          +`${formatSimpleListForPgsql(movie.languages)},`
          +`${formatSimpleListForPgsql(movie.countries)}`
          +`);`;
      }
    }
    if(queryToPush){
      seedingQueries += queryToPush + `\n`;
    } else {
      console.log(`Le film ${presentations[i].title} n'a pas pu être traité`);
    };
  }
  // Writing in a SQL instructions file
  const fileName = `createMovies.sql`;
  appendFile(__dirname+"/"+fileName, seedingQueries);``
  console.log(`L'écriture des fichiers SQL est terminée.`);
};

// fetch5TopMoviesFromQuery().then(result => console.log(result));
// fetch5TopMoviesFromQueryWithDetails().then(result => console.log(result));
// fetchTMDBList().then(result => console.log(result));
// fetchTMDBListWithDetails().then(result => console.log(result));
// saveMoviesList();

prepareDBSeeding(presentations,moviesList);

function seedingPropositionSlots(season_number,first_episode,first_date){
  let date = new Date(first_date);
  const lastDate = new Date (first_date.slice(0,-6)+'-12-31');
  let episode = first_episode;
  let sqlInstructions = `INSERT INTO proposition_slot ("season_number","episode","publishing_date","is_booked") VALUES\n`;
  while (date < lastDate){
    console.log(date);
    sqlInstructions += `(${season_number},${episode},'${date.toISOString().slice(0,-14)}',false),\n`
    date.setDate(date.getDate()+7);
    episode++;
  }
  sqlInstructions = sqlInstructions.slice(0,-2)+';'
  return sqlInstructions;
}

// console.log(seedingPropositionSlots(3,19,'2022-05-16'));
// createRandomPassWord(chaincharacter,20).then(result => console.log('Nouveau mot de passe : ' + result));
