const {Router} = require('express');
const router = Router();

// Import middlewares for checking user role if necessary

// Import subrouters :
const gamesRouter = require('./games.router');
const platformsRouter = require('./platforms.router');
const genresRouter = require('./genres.router');
const usersRouter = require('./users.router');

// Adding subrouters
router
  .use('/games', gamesRouter)
  .use('/platforms', platformsRouter)
  .use('/genres', genresRouter)
  .use('/users', usersRouter);

module.exports = router;
