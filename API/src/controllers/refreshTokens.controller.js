const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

const usersDataMapper = require('../database/models/users.datamapper');

const refreshTokensController = {
  async refreshTokens(req, res) {
    debug(req.headers);
    const user = jwtMethods.decryptRefreshToken(
      jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'refreshToken'),
    );
    debug(user);
    const userInDB = await usersDataMapper.getUserById(user.id);
    if (!(userInDB)) {
      return new APIError('Ce compte utilisateur a été supprimé.', 401);
    }
    // Need to purge extra datas from tokens structure
    delete user.iat;
    delete user.exp;
    // Create new access and refresh tokens
    res.cookie('accessToken', jwtMethods.createAccessToken(user));
    res.cookie('refreshToken', jwtMethods.createRefreshToken(user));
    res.status(200).json(user.id);
  },
};

module.exports = refreshTokensController;
