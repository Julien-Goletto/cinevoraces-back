require('dotenv').config({ path: '../../.env' });
const axios = require('axios');

const RAWG = {

  // Regrouping all used datas to format game objects
  dataToExtract: ['name', 'platforms', 'released', 'background_image', 'genres'],

  /**
   * Get platform list to recover basic informations
   * @returns {Array} game platform objects
   */
  async getPlatforms(RAWG_API_KEY){
    const platformsList = await axios(`https://api.rawg.io/api/platforms?key=${RAWG_API_KEY}`)
    return platformsList;
  },

  /**
   * Get most pertinent game for a specific search, formated to be used later (the first of the returned list)
   * @param {string} RAWG_API_KEY - API key from .env variables
   * @param {integer} platformId
   * @param {string} searchQuery
   * @returns {Object} the most pertinent object game
   */
  async getGamesFromPlatformIdAndSearchQuery (RAWG_API_KEY, platformId, searchQuery){
    const response = await axios(`https://api.rawg.io/api/games?platforms=${platformId}&search=${searchQuery}&search_precise=true&key=${RAWG_API_KEY}`);
    const formatedGamesArray = RAWG.formatGamesData(response.data.results[0]);
    return formatedGamesArray;
  },

  /**
   * Format a game object returned by RAWG API
   * @param {Object} gameFromRAWGAPI Game returned, to format
   * @returns {Object} A formated game object
   */
  formatGamesData(gameFromRAWGAPI){
    const gameObject = Object.fromEntries(Object.entries(gameFromRAWGAPI).filter(([key,_]) => RAWG.dataToExtract.includes(key)));
    // Formating data specificly for platforms and genres  
    reformatedPlatforms = [];
    reformatedGenres = [];
    for (let platform of gameObject.platforms){
      reformatedPlatforms.push(platform.platform.name);
    }
    for (let genre of gameObject.genres){
      reformatedGenres.push(genre.name);
    }
    gameObject.platforms = reformatedPlatforms;
    gameObject.genres = reformatedGenres;
    return gameObject;
  },

  async createGamesPayload (RAWG_API_KEY, gamesToAdd){
    const gamesPayloadPromises = [];
    for (game of gamesToAdd){
      const results = RAWG.getGamesFromPlatformIdAndSearchQuery (RAWG_API_KEY, game.platformId,game.gameTitle);
      gamesPayloadPromises.push(results);
    };
    const gamesPayload = await Promise.all(gamesPayloadPromises); //Considérer allSettled pour une gestion des erreurs
    return gamesPayload;
  },
};

module.exports = RAWG;