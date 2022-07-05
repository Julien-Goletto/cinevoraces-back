const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');

const usersDataMapper = require('../database/models/users.datamapper');

// const cookieOption = { httpOnly: true, sameSite: 'none', secure: true };

const refreshTokensController = {
  async refreshTokens(req, res) {
    const { token } = req.session;
    if (!token) {
      throw new APIError('Vous devez être connecté pour poursuivre.', req.url, 401);
    }
    let user;
    try {
      user = jwtMethods.decryptRefreshToken(token);
    } catch (e) {
      throw new APIError('La vérification du contenu du refresh token a échouée.', req.url, 401);
    }
    const userInDB = await usersDataMapper.getUserById(user.id, true);
    if (!userInDB) {
      return new APIError('Ce compte utilisateur a été supprimé.', 404);
    }
    // On récupère les données user à jour
    user = userInDB;
    // Create new access and refresh tokens - old version in cookies, new version througth body
    const accessToken = jwtMethods.createAccessToken(user);
    const refreshToken = jwtMethods.createRefreshToken(user);
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    res.status(200).json(user);
  },
};

module.exports = refreshTokensController;
