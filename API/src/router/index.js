const {Router} = require('express');
const router = Router();

// Import middlewares for checking user role if necessary

// Import subrouters :
const moviesRouter = require('./movies.router');
const usersRouter = require('./users.router');
const metricsRouter = require('./metrics.router');

// Adding subrouters
router
  .use('/movies', moviesRouter)
  .use('/users', usersRouter)
  .use('/metrics', metricsRouter);

module.exports = router;
