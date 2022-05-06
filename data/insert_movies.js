const fetchList = require('../API/src/external_api/fetchAPI');
require('dotenv').config({path: '../API/.env'});
const {TMDB_API_KEY} = process.env;

const searchQuery = 'Fight Club';

async function test (){
  const movies = await fetchList.fetchList(searchQuery,TMDB_API_KEY);
  return movies;
}

test().then(result => console.log(result));