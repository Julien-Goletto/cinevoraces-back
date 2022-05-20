const express = require('express');
const usersController = require('../controllers/users.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Sanitizer
const cleaner = require('../middlewares/cleaner');

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
   * @returns {String} 200 - Utilisateur enregistré avec succès, merci de vous connecter
   * @returns {APIError} 400 - Ce pseudo ou cet email sont déjà enregistrés
   */
  .post('/register', cleaner, validate('body', createUserSchema), routerWrapper(usersController.createUser))
  /**
   * Update user with informations give by user
   * @route PUT /v1/users/modify/:userPseudo
   * @group - Users
   * @param {String} userPseudo
   * @param {UserUpdate.model} UserUpdate.body.required - user object credentials
   * @returns {User} 200 - Modifications effectuées
   * @returns {APIError} 404 - Ce compte n'existe pas
   * @returns {APIError} 400 - Informations éronnées
   */
  .put('/modify/:userPseudo', checkingUser.checkLogStatus, cleaner, validate('body', userUpdateSchema), routerWrapper(usersController.updateUser))
  /**
   * Log the user comparing entered credentails with hashed datas in database,
   * then create two JWT: Access and Refresh tokens, passed into cookies.
   * @route POST /v1/users/login
   * @group - Users
   * @param {UserLogin.model} UserLogin.body.required - user object credentials
   * @returns {User} 200
   * @returns {APIError} 400 - Informations éronnées
   */
  .post('/login', validate('body', userLoginSchema), routerWrapper(usersController.logUser))
  /**
   * Get on user by id
   * @route GET /v1/users/:userId
   * @group - Users
   * @param {Integer} userId
   * @returns {User} 200 - User Object
   * @returns {APIError} 404 - Ce compte n'existe pas
   */
  .get('/:userId', checkingUser.checkLogStatus, routerWrapper(usersController.getUserById))
  /**
   * Return users listing
   * @route GET /v1/users/
   * @group - Users
   * @returns {Array} 200 - Array of users
   * @returns {String} 404 - Aucun utilisateurs enregistré
   */
  .get('/', checkingUser.checkLogStatus, routerWrapper(usersController.getUsersList))
  /**
   * Delete a user, using the pseudo (admin only)
   * @route DELETE /v1/users/:userPseudo
   * @group - Users
   * @param {String} userPseudo
   * @returns {String} 200 - Utilisateur supprimé
   * @returns {APIError} 404 - Cet utilisateur n'existe pas
   */
  .delete('/:userPseudo', checkingUser.checkLogStatus, routerWrapper(usersController.deleteUser));
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
 * @property {String} oldPassword - user old password
 * @property {String} pseudo - User Pseudo (unique)
 * @property {String} mail - User mail (unique)
 * @property {String} password - User password
 */
usersRouter.use(handleError);

module.exports = usersRouter;
