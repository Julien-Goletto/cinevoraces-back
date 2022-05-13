const { Router } = require('express');

const router = Router();

// Import middlewares for checking user role if necessary

// Import subrouters :
const refreshTokensRouter = require('./refreshTokens.router');
const moviesRouter = require('./movies.router');
const usersRouter = require('./users.router');
const metricsRouter = require('./metrics.router');

// Adding subrouters
router
  .get('/', (_, res) => res.send('Coucou'))
  .use('/refreshTokens', refreshTokensRouter)
  .use('/movies', moviesRouter)
  .use('/users', usersRouter)
  .use('/metrics', metricsRouter);

module.exports = router;
