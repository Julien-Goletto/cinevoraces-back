const express = require('express');
const usersController = require('../controllers/users.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const { userSchema } = require('../validation/schemas/');


// Configuration du subRouter 
const usersRouter = express.Router();

usersRouter
  /**
   * Save a new user in database
   * @route POST /users/register
   * @group - Users
   * @param {UserRegistration.model}  UserRegistration.body.required- user object credentials
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/register', validate('body',userSchema), routerWrapper(usersController.createUser))
  /**
   * Log the user comparing entered credentails with hashed datas in database,
   * then create two JWT: Access and Refresh tokens, passed into cookies.
   * @route POST /users/login
   * @group - Users
   * @param {UserLogin.model} UserLogin.body.required - user object credentials
   * @returns {User} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/login', validate('body',userSchema), routerWrapper(usersController.logUser))
    /**
   * Disconnect user, suppressing the session.user
   * @route GET /users/logout
   * @group - Users
   * @return {String} 200 - success response
   * @return {APIError} 404 - fail response
   */
  .get('/logout', routerWrapper(usersController.logOutUser))
   /**
   * Return user
   * @route GET /users/userId
   * @group - Users
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
    .get('/:userId', routerWrapper(usersController.getUserById))
    /**
   * Return users listing
   * @route GET /users/
   * @group - Users
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/', routerWrapper(usersController.getUsersList))
    /**
   * Delete a user, using the pseudo (admin only)
   * @route GET /users/:pseudo
   * @group - Users
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .delete('/:userId', routerWrapper(usersController.deleteUser));

  /**
 * @typedef UserRegistration
 * @property {String} pseudo - User Pseudo (unique)
 * @property {String} mail - User email (unique)
 * @property {String} password - User password
 */
  /**
 * @typedef UserLogin
 * @property {String} pseudo - User Pseudo (unique)
 * @property {String} password - User password
 */

usersRouter.use(handleError);

module.exports = usersRouter;