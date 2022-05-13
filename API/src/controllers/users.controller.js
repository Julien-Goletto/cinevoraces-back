const usersDataMapper = require('../database/models/users.datamapper');
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

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
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    console.log(req.headers.cookie);
    res.status(200).json(result);
  },

  async updateUser(req, res) {
    const requestedUserId = parseInt(req.params.userId, 10);
    // Additionnal Safe guard
    const requestingUserId = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).id;
    if (requestedUserId !== requestingUserId) {
      throw new APIError('You have no right to change these parameters');
    }
    const user = req.body;
    await usersDataMapper.updateUser(requestedUserId, user);
    res.status(200).json('Successfull change informations.');
  },

  async getUserById(req, res) {
    const requestedUserId = parseInt(req.params.userId, 10);
    const requestingUserId = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).id;
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

  logOutUser(req, res) {
    if (!req.session.user) {
      throw new APIError('You are not logged.');
    }
    delete req.session.user;
    res.status(200).json('You have successfuly logged out.');
  },

  async deleteUser(req, res) {
    const { userId } = req.params;
    const results = await usersDataMapper.deleteUserWithPseudo(userId);
    res.status(200).json(results);
  },
};

module.exports = usersController;
