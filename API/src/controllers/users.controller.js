const usersDataMapper = require('../database/models/users.datamapper');
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

// const cookieOption = {  /*httpOnly: true,*/ sameSite: 'none', secure: true };

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
    res.cookie('accessToken', accessToken, cookieOption);
    res.cookie('refreshToken', refreshToken, cookieOption);
    res.status(200).json({
      result,
      accessToken: jwtMethods.createAccessToken(user),
      refreshToken: jwtMethods.createAccessToken(user),
    });
  },

  async updateUser(req, res) {
    const requestedUserId = parseInt(req.params.userId, 10);
    // Additionnal Safe guard
    const requestingUserId = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).id;
    if (requestedUserId !== requestingUserId) {
      throw new APIError("Vous n'avez la permission pour modifier ces champs.", req.url, 401);
    }
    const user = req.body;
    const results = await usersDataMapper.updateUser(requestedUserId, user);
    res.status(201).json(results);
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

  async deleteUser(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const requestingUserRole = jwtMethods.decryptAccessToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken'),
    ).role;
    if (requestingUserRole !== 'admin') {
      throw new APIError("Vous n'avez pas l'autorisation de supprimer un utilisateur", req.url, 401);
    }
    const results = await usersDataMapper.deleteUserById(userId);
    res.status(200).json(results);
  },
};

module.exports = usersController;
