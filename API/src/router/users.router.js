const express = require('express');
const usersController = require('../controllers/users.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Checking user and privegies
const checkingUser = require('../middlewares/checkingUser');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const { createUserSchema, userLoginSchema, userUpdateSchema } = require('../validation/schemas');

// Configuration du subRouter
const usersRouter = express.Router();

usersRouter
  /**
   * Save a new user in database
   * @route POST /v1/users/register
   * @group - Users
   * @param {UserRegistration.model}  UserRegistration.body.required- user object credentials
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/register', validate('body', createUserSchema), routerWrapper(usersController.createUser))
  /**
   * Log the user comparing entered credentails with hashed datas in database,
   * then create two JWT: Access and Refresh tokens, passed into cookies.
   * @route POST /v1/users/login
   * @group - Users
   * @param {UserLogin.model} UserLogin.body.required - user object credentials
   * @returns {User} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .post('/login', validate('body', userLoginSchema), routerWrapper(usersController.logUser))
  /**
   * Update user with informations give by user
   * @route PUT /v1/users/userId
   * @group - Users
   * @param {UserUpdate.model} UserUpdate.body.required - user object credentials
   * @returns {User} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .put('/:userId', checkingUser.checkLogStatus, validate('body', userUpdateSchema), routerWrapper(usersController.updateUser))
  /**
   * Disconnect user, suppressing the session.user
   * @route GET /v1/users/logout
   * @group - Users
   * @return {String} 200 - success response
   * @return {APIError} 404 - fail response
   */
  .get('/logout', checkingUser.checkLogStatus, routerWrapper(usersController.logOutUser))
  /**
   * Return user
   * @route GET /v1/users/userId
   * @group - Users
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/:userId', checkingUser.checkLogStatus, routerWrapper(usersController.getUserById))
  /**
   * Return users listing
   * @route GET /v1/users/
   * @group - Users
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .get('/', checkingUser.checkLogStatus, routerWrapper(usersController.getUsersList))
  /**
   * Delete a user, using the pseudo (admin only)
   * @route GET /v1/users/:pseudo
   * @group - Users
   * @returns {String} 200 - success response
   * @returns {APIError} 404 - fail response
   */
  .delete('/:userId', checkingUser.checkLogStatus, routerWrapper(usersController.deleteUser));

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
/**
 * @typedef UserUpdate
 * @property {String} pseudo - User Pseudo (unique)
 * @property {String} mail - User mail (unique)
 * @property {String} password - User password
 */
usersRouter.use(handleError);

module.exports = usersRouter;
