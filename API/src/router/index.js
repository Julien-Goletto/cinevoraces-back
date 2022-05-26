const { Router } = require('express');

const router = Router();

// Gestion des erreurs
const handleError = require('../middlewares/handleError');

// Import subrouters :
const refreshTokensRouter = require('./refreshTokens.router');
const moviesRouter = require('./movies.router');
const usersRouter = require('./users.router');
const metricsRouter = require('./metrics.router');
const reviewsRouter = require('./reviews.router');
const propositionsRouter = require('./propositions.router');

// Adding subrouters
router
  .use('/refreshTokens', refreshTokensRouter)
  .use('/movies', moviesRouter)
  .use('/users', usersRouter)
  .use('/metrics', metricsRouter)
  .use('/reviews', reviewsRouter)
  .use('/propositions', propositionsRouter)
  .use(handleError);

module.exports = router;
