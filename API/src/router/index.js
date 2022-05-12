const {Router} = require('express');
const router = Router();

// Import middlewares for checking user role if necessary

// Import subrouters :
const moviesRouter = require('./movies.router');
const usersRouter = require('./users.router');

// Adding subrouters
router
  .get('/', (_,res) => res.send('Coucou'))
  .use('/movies', moviesRouter)
  .use('/users', usersRouter);

module.exports = router;
