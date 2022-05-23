const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

const usersDataMapper = require('../database/models/users.datamapper');

const cookieOption = { secure: true, httpOnly: true };

const refreshTokensController = {
  async refreshTokens(req, res) {
    let token;
    if (req.headers.cookie) {
      token = jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'refreshToken');
    } else if (req.headers.authorization) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      throw new APIError('Vous devez être connecté pour poursuivre.', req.url, 401);
    }
    let user;
    try {
      user = jwtMethods.decryptRefreshToken(token);
    } catch (e) {
      throw new APIError('La vérification du contenu du refresh token a échouée.', req.url, 401);
    }
    const userInDB = await usersDataMapper.getUserById(user.id);
    if (!(userInDB)) {
      return new APIError('Ce compte utilisateur a été supprimé.', 404);
    }
    // Need to purge extra datas from tokens structure
    delete user.iat;
    delete user.exp;
    // Create new access and refresh tokens
    res.cookie('accessToken', jwtMethods.createAccessToken(user), cookieOption);
    res.cookie('refreshToken', jwtMethods.createRefreshToken(user), cookieOption);
    res.status(200).json(user);
  },
};

module.exports = refreshTokensController;
