/* eslint-disable guard-for-in */ // Safe guard dans une méthode à part
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
// const filters = 'season_number=3'
//                   + '&genres=Comédie|Drame|Thriller'
//                   + '&countries=Japan|United+States+of+America|France'
//                   + '&runtime=h120'
//                   + '&release_date=l1954|h2018'
//                   + '&avg_rating=l3'
//                   + '&viewed=true'
//                   + '&bookmarked=false'
//                   + '&liked=true'
//                   + '&rating=l4';

const customFilters = {
  plusRegex: /(?<=[A-Za-z])\+(?=[A-Za-z])/gm,
  eAccentAiguMinUTF8: ['%C3%A9', 'é'],
  eAccentAiguMajUTF8: ['%C3%89', 'É'],
  eAccentGraveMinUTF8: ['%C3%A8', 'è'],
  aAccentGraveMinUTF8: ['%C3%A0', 'à'],
  allowedFilters: [
    'season_number',
    'genres',
    'countries',
    'runtime',
    'release_date',
    'avg_rating',
    'viewed',
    'bookmarked',
    'liked',
    'rating',
  ],
  userFilters: () => customFilters.allowedFilters.slice(6),
  /**
   * Transforms the filtersQuery into a filter options object,
   * used later for building a custom query
   * @param {string} filtersQuery
   * @returns {Object} filtersObject
   */
  filtersParser: (filtersQuery) => filtersQuery
    .replace(customFilters.eAccentAiguMinUTF8[0], customFilters.eAccentAiguMinUTF8[1])
    .replace(customFilters.eAccentAiguMajUTF8[0], customFilters.eAccentAiguMajUTF8[1])
    .replace(customFilters.eAccentGraveMinUTF8[0], customFilters.eAccentGraveMinUTF8[1])
    .replace(customFilters.aAccentGraveMinUTF8[0], customFilters.aAccentGraveMinUTF8[1])
    .split('&')
    .map((f) => f.split('='))
    .map((f) => [f[0], (f[1].includes('|')) ? f[1].replace(customFilters.plusRegex, ' ').split('|') : f[1]])
    .reduce((filtersObject, line) => {
      filtersObject[line[0]] = line[1];
      return filtersObject;
    }, {}),
  /**
   * Check passed filters. If one is incorrect, return false
   * @param {Object} filterObject
   * @returns true / false
   */
  checkFilters: (filterObject) => Object.keys(filterObject)
    .filter((f) => customFilters.allowedFilters.includes(f))
    .length === Object.keys(filterObject).length,
  /**
  * Check user filter presence. If there is one, return true.
  * @param {Object} filterObject
  * @returns true / false
  */
  detectUserFilter: (filterObject) => Object.keys(filterObject)
    .filter((f) => customFilters.userFilters().includes(f)).length > 0,
  /**
  * Transforms the filtersQuery into a filter options object,
  * used later for building a custom query
  * @param {string} filtersQuery
  * @returns {Object} filtersObject
  */
  writeFiltersQuery: (filtersObject) => {
    let filtersQuery = '\nWHERE is_published = true\n';
    for (const filter in filtersObject) {
    // Processing might be different depending on passed filters
      switch (filter) {
        case 'genres': case 'countries':
          filtersQuery += `AND ${filter} && ARRAY[${
            filtersObject[filter].reduce((query, f) => `${query},'${f}'`, '').replace(',', '')}]\n`;
          break;
        case 'release_date':
          filtersQuery += `AND EXTRACT(YEAR FROM ${filter}) BETWEEN ${
            filtersObject[filter][0].replace('l', '')} AND ${filtersObject[filter][1].replace('h', '')}\n`;
          break;
        case 'avg_rating': case 'rating':
          filtersQuery += `AND ${filter} >= ${filtersObject[filter].replace('l', '')}\n`;
          break;
        case 'runtime':
          filtersQuery += `AND ${filter} <= ${filtersObject[filter].replace('h', '')}\n`;
          break;
        default: // For season, bookmarked, viewed, liked
          filtersQuery += `AND ${filter} = ${filtersObject[filter]}\n`;
      }
    }
    return filtersQuery;
  },
  /**
  * Writing junction with review table for user inputs to be used in filters
  * @param {Integer} userId
  * @returns {string} SQL instructions for junction
  */
  writeSQLJunction: (userId) => `FULL OUTER JOIN\n(SELECT movie_id,${
    customFilters.userFilters().reduce((list, f) => `${list},${f}`, '').replace(',', '')
  } FROM review WHERE user_id = ${userId})ur\n ON movies_infos.id = ur.movie_id`,
  writeSQLFilters: (filters, userId) => {
    const filtersObject = customFilters.filtersParser(filters);
    // First, the safeguard
    if (!customFilters.checkFilters(filtersObject)) {
      throw new Error("Parmi les filtres saisis, au moins un filtre n'est pas implémenté.");
    }
    // Initialize the query with the constant part of it
    let globalQuery = 'SELECT * FROM movies_infos\n';
    // Adding junction if compulsary
    if (customFilters.detectUserFilter(filtersObject) && userId) {
      (globalQuery += customFilters.writeSQLJunction(userId));
    }
    // Adding where clauses
    globalQuery += customFilters.writeFiltersQuery(filtersObject);
    // Suppressing last formating char and adding semicolon
    globalQuery = `${globalQuery.slice(0, -1)};`;
    return globalQuery;
  },
};

module.exports = customFilters;
