const usersDataMapper = require('../database/models/users.datamapper');
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');
require('dotenv').config();
const cloudinaryUpload = require('../external_api/cloudinary.module');

const { CLOUDINARY_URL } = process.env;

// const cookieOption = { httpOnly: true, sameSite: 'none', secure: true };

const usersController = {
  async createUser(req, res) {
    const user = req.body;
    const result = await usersDataMapper.createUser(user);
    res.status(201).json(result);
  },

  async logUser(req, res) {
    const user = req.body;
    const result = await usersDataMapper.logUser(user);
    const accessToken = jwtMethods.createAccessToken(result);
    const refreshToken = jwtMethods.createRefreshToken(result);
    // For Heroku hosting, it's compulsary to emit tokens with both cookies and response body
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    result.accessToken = accessToken;
    result.refreshToken = refreshToken;
    res.status(200).json(result);
  },

  async addProfilePic(req, res) {
    console.log('On rentre dans le controller');
    console.log(req.body);
    // Check user
    const requestedUserId = parseInt(req.params.userId, 10);
    const { token } = req.session;
    const user = jwtMethods.decryptAccessToken(token);
    const requestingUserId = user.id;
    if (requestedUserId !== requestingUserId) {
      throw new APIError("Vous n'avez pas la permission de modifier cette photo de profil.", '', 401);
    }
    // Pic adding / modification
    const userPseudo = user.pseudo;
    const { fileName } = req;
    console.log(`Le fichier à ajouter est ${fileName}`);
    const avatarUrl = await cloudinaryUpload.uploadThumbnail(
      CLOUDINARY_URL,
      userPseudo,
      fileName,
    );
    console.log(`L'url à ajouter est le ${avatarUrl}`);
    const results = await usersDataMapper.addProfilePic(requestedUserId, avatarUrl);
    console.log('La pic est bien envoyée à cloudinary.');
    res.status(201).json(results);
  },

  async updateUser(req, res) {
    const requestedUserId = parseInt(req.params.userId, 10);
    // Additionnal Safe guard
    const { token } = req.session;
    const requestingUserId = jwtMethods.decryptAccessToken(token).id;
    const requestingToken = jwtMethods.decryptAccessToken(token).role;
    console.log(requestingToken);
    if (requestedUserId !== requestingUserId && requestingToken !== 'admin') {
      throw new APIError("Vous n'avez la permission pour modifier ces champs.", req.url, 401);
    }
    const user = req.body;
    const results = await usersDataMapper.updateUser(requestedUserId, user);
    res.status(201).json(results);
  },

  async getUserById(req, res) {
    const requestedUserId = parseInt(req.params.userId, 10);
    const { token } = req.session;
    const requestingUserId = jwtMethods.decryptAccessToken(token).id;
    let hasRights = false;
    if (requestedUserId === requestingUserId) {
      hasRights = true;
    }
    const result = await usersDataMapper.getUserById(requestedUserId, hasRights);
    res.status(200).json(result);
  },

  async getUsersList(_, res) {
    const results = await usersDataMapper.getUsersList();
    res.status(200).json(results);
  },

  async deleteUser(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const { token } = req.session;
    const requestingUserRole = jwtMethods.decryptAccessToken(token).role;
    if (requestingUserRole !== 'admin') {
      throw new APIError("Vous n'avez pas l'autorisation de supprimer un utilisateur", req.url, 401);
    }
    const results = await usersDataMapper.deleteUserById(userId);
    res.status(200).json(results);
  },
  async togglePrivileges(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const { token } = req.session;
    const requestingUserRole = jwtMethods.decryptAccessToken(token).role;
    if (requestingUserRole !== 'admin') {
      throw new APIError("Vous n'avez pas d'éditer un utilisateur", req.url, 401);
    }
    const results = await usersDataMapper.togglePrivileges(userId);
    console.log(results);
    res.status(201).json(results);
  },
};

module.exports = usersController;
