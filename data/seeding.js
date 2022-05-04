const RAWG = require('../API/src/external_api/RAWG.service');
require('dotenv').config({ path: '../API/.env' });
const {RAWG_API_KEY} = process.env;

/**
 * Convert an array to an array format compatible with pgsql requirements
 * @param {Array} list 
 * @returns {string} concatenated array to string for using in pgsql purposes
 */
function formatSimpleListForPGSql (list){
  return `array['` + `${list.join(`','`)}` + `']`;
}
/**
 * Convert an including single quote string into double-single quotes string, format compatible with pgsql requirements
 * @param {string} string 
 * @returns {string} Sanitized string
 */
function sanitizeSingleQuotes(string){
  return string.replace(/'+/g,"''");
}

/**
 * Convert an array of multiple game objects to pgsql instructions, using the SQL add_new_game function
 * @param {Array} gamesPayloadToInsert 
 * @returns {string} SQL instructions
 */
function createGlobalInsertQuery(gamesPayloadToInsert){
  
  let globalQuery = ``;
  for (const game of gamesPayloadToInsert){
    globalQuery += `SELECT add_new_game('${sanitizeSingleQuotes(game.name)}','${game.released}','${game.background_image}',`
                  + `${formatSimpleListForPGSql(game.platforms)},${formatSimpleListForPGSql(game.genres)});\n`;
  };
  console.log(globalQuery);
  return globalQuery;
};

// A game Sample to be used with RAWG.createGamesPayload(list)
gamesToAdd = [
  {platformId:7,gameTitle:'Metroid Dread'},{platformId:7,gameTitle:'Hollow Knight'},{platformId:7,gameTitle:'FEZ'},{platformId:7,gameTitle:'Undertale'},{platformId:7,gameTitle:'Hades'},
  {platformId:7,gameTitle:'Bayonetta'},{platformId:7,gameTitle:'The Legend of Zelda: Breath of the Wild'},{platformId:7,gameTitle:'Dark Souls: Remastered'},{platformId:7,gameTitle:'Gris'},
  {platformId:7,gameTitle:'Slay The Spire'},{platformId:7,gameTitle:'Super Mario Odyssey'},{platformId:7,gameTitle:'Into The Breach'},{platformId:7,gameTitle:'Invisible, Inc.'},
  {platformId:7,gameTitle:'Okami HD'},{platformId:7,gameTitle:'Dungeon of the Endless'},{platformId:7,gameTitle:'Downwell'},{platformId:7,gameTitle:'Street of Rage 4'},
  {platformId:7,gameTitle:'Kirby and the Forgotten Land'},{platformId:7,gameTitle:'Triangle Strategy'},{platformId:7,gameTitle:'Shin Megami Tensei V'},
];

// A payload sample acquired with RAWG API and saved to avoid useless requests
const gamesPayloadToInsert = [
  {
    name: 'Metroid Dread',
    platforms: [ 'Nintendo Switch' ],
    released: '2021-10-08',
    background_image: 'https://media.rawg.io/media/games/c26/c262f8b54b46edc72594c4a9bb8ee13e.jpg',
    genres: [ 'Platformer', 'Action', 'RPG' ]
  },
  {
    name: 'Hollow Knight',
    platforms: [
      'PC',
      'Xbox One',
      'PlayStation 4',
      'Nintendo Switch',
      'macOS',
      'Linux',
      'PS Vita'
    ],
    released: '2017-02-23',
    background_image: 'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg',
    genres: [ 'Platformer', 'Indie', 'Action' ]
  },
  {
    name: 'FEZ',
    platforms: [
      'PC',
      'PlayStation 4',
      'Nintendo Switch',
      'iOS',
      'macOS',
      'Linux',
      'Xbox 360',
      'PlayStation 3',
      'PS Vita'
    ],
    released: '2012-04-13',
    background_image: 'https://media.rawg.io/media/games/4cb/4cb855e8ef1578415a928e53c9f51867.png',
    genres: [ 'Adventure', 'Action', 'Puzzle', 'Indie', 'Platformer' ]
  },
  {
    name: 'Undertale',
    platforms: [
      'PC',
      'PlayStation 4',
      'Xbox One',
      'Xbox Series S/X',
      'Nintendo Switch',
      'macOS',
      'Linux',
      'PS Vita'
    ],
    released: '2015-09-14',
    background_image: 'https://media.rawg.io/media/games/ffe/ffed87105b14f5beff72ff44a7793fd5.jpg',
    genres: [ 'Indie', 'RPG' ]
  },
  {
    name: 'Hades',
    platforms: [
      'PC',
      'PlayStation 5',
      'Xbox One',
      'PlayStation 4',
      'Xbox Series S/X',
      'Nintendo Switch'
    ],
    released: '2020-09-17',
    background_image: 'https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg',
    genres: [ 'Indie', 'Adventure', 'Action', 'RPG' ]
  },
  {
    name: 'Bayonetta',
    platforms: [
      'PC',
      'Xbox One',
      'Nintendo Switch',
      'Xbox 360',
      'PlayStation 3',
      'Wii U'
    ],
    released: '2009-06-23',
    background_image: 'https://media.rawg.io/media/games/a49/a4991c35602884e0b0af9c62afb10ff5.jpg',
    genres: [ 'Action' ]
  },
  {
    name: 'The Legend of Zelda: Breath of the Wild',
    platforms: [ 'Nintendo Switch', 'Wii U' ],
    released: '2017-03-03',
    background_image: 'https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg',
    genres: [ 'Adventure', 'Action', 'RPG' ]
  },
  {
    name: 'Dark Souls: Remastered',
    platforms: [ 'PC', 'PlayStation 4', 'Xbox One', 'Nintendo Switch' ],
    released: '2018-05-23',
    background_image: 'https://media.rawg.io/media/games/29c/29c6c21cc0c78cff6f45d23631cc82f4.jpg',
    genres: [ 'Action' ]
  },
  {
    name: 'Gris',
    platforms: [ 'PC', 'PlayStation 4', 'Nintendo Switch', 'iOS', 'macOS' ],
    released: '2018-12-13',
    background_image: 'https://media.rawg.io/media/games/51c/51c430f1795c79b78f863a9f22dc422d.jpg',
    genres: [ 'Indie', 'Platformer', 'Adventure', 'Puzzle' ]
  },
  {
    name: 'Slay the Spire',
    platforms: [
      'PC',
      'Xbox One',
      'PlayStation 4',
      'Nintendo Switch',
      'iOS',
      'Android',
      'macOS',
      'Linux'
    ],
    released: '2019-01-22',
    background_image: 'https://media.rawg.io/media/games/f52/f5206d55f918edf8ee07803101106fa6.jpg',
    genres: [ 'Card', 'Strategy', 'Indie', 'RPG' ]
  },
  {
    name: "Assassin's Creed Odyssey",
    platforms: [ 'PC', 'Xbox One', 'PlayStation 4', 'Nintendo Switch' ],
    released: '2018-10-05',
    background_image: 'https://media.rawg.io/media/games/c6b/c6bd26767c1053fef2b10bb852943559.jpg',
    genres: [ 'Action', 'RPG' ]
  },
  {
    name: 'Into the Breach',
    platforms: [ 'PC', 'Nintendo Switch', 'macOS' ],
    released: '2018-02-26',
    background_image: 'https://media.rawg.io/media/games/800/800d07ca648a9778a8230f40088e0866.jpg',
    genres: [ 'Strategy', 'Indie', 'RPG' ]
  },
  {
    name: 'Invisible, Inc.',
    platforms: [
      'PC',
      'PlayStation 4',
      'Nintendo Switch',
      'iOS',
      'macOS',
      'Linux'
    ],
    released: '2015-05-12',
    background_image: 'https://media.rawg.io/media/games/849/849c187c0b5d4cd1ee3283148f7e4cdb.jpg',
    genres: [ 'Strategy', 'Adventure' ]
  },
  {
    name: 'OKAMI HD / 大神 絶景版',
    platforms: [
      'PC',
      'Xbox One',
      'PlayStation 4',
      'Nintendo Switch',
      'PlayStation 3'
    ],
    released: '2017-12-12',
    background_image: 'https://media.rawg.io/media/games/a38/a3857b2445c70ac5dbe73b210a827ad8.jpg',
    genres: [ 'Adventure', 'Action' ]
  },
  {
    name: 'Dungeon of the Endless',
    platforms: [
      'PC',
      'Xbox One',
      'PlayStation 4',
      'Nintendo Switch',
      'iOS',
      'macOS'
    ],
    released: '2014-10-27',
    background_image: 'https://media.rawg.io/media/games/a0c/a0cb0ac048c75b41d2620d2e6cb6f983.jpg',
    genres: [ 'Indie', 'Strategy', 'Adventure', 'RPG' ]
  },
  {
    name: 'Downwell',
    platforms: [
      'PC',
      'PlayStation 4',
      'Nintendo Switch',
      'iOS',
      'Android',
      'PS Vita'
    ],
    released: '2015-10-14',
    background_image: 'https://media.rawg.io/media/screenshots/e9c/e9ce72a3e2c1ac344e8876d6bb0dcf50.jpeg',
    genres: [
      'Adventure',
      'Action',
      'Casual',
      'Arcade',
      'Indie',
      'Platformer'
    ]
  },
  {
    name: 'Streets of Rage 4',
    platforms: [ 'PC', 'Xbox One', 'PlayStation 4', 'Nintendo Switch' ],
    released: '2020-04-30',
    background_image: 'https://media.rawg.io/media/games/e56/e56d74b0a1072662eea7c1a194363884.jpg',
    genres: [ 'Indie', 'Action', 'Fighting' ]
  },
  {
    name: 'Kirby and the Forgotten Land',
    platforms: [ 'Nintendo Switch' ],
    released: '2022-03-25',
    background_image: 'https://media.rawg.io/media/games/42a/42a71f0cbe23185f778c10462faa12d8.jpg',
    genres: [ 'Action' ]
  },
  {
    name: 'TRIANGLE STRATEGY',
    platforms: [ 'Nintendo Switch' ],
    released: '2022-03-04',
    background_image: 'https://media.rawg.io/media/games/334/3340776fc9a78199838c7c1d8ec22bd5.jpg',
    genres: [ 'Strategy', 'Adventure', 'RPG' ]
  },
  {
    name: 'Shin Megami Tensei V',
    platforms: [ 'Nintendo Switch' ],
    released: '2021-11-12',
    background_image: 'https://media.rawg.io/media/games/1b6/1b6673b646af55f834938bedebee2a0f.jpg',
    genres: [ 'Adventure', 'Action', 'RPG' ]
  }
];

createGlobalInsertQuery(gamesPayloadToInsert);