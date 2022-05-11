const debug = require('debug')('Refresh_Access_Token')
const APIError = require('../Errors/APIError');
const jwtMethods = require('../JWT/jwt.module');
const usersDataMapper = require('../database/models/users.datamapper');

function refreshAccessToken(req,res,next){
  // On récupère le refresh token
  const user = jwtMethods.decryptRefreshToken(
    jwtMethods.cookieFinder(
      jwtMethods.cookieParser(req.headers.cookie),'refreshToken'
    )
  );
  // Vérification présence user en bdd
  if(!usersDataMapper.getUserById(user.id)){
    return new APIError('Ce compte utilisateur a été supprimé.',401);
  }
  // On recrée le accessToken
  delete user.iat;
  delete user.exp;
  res.cookie('accessToken', jwtMethods.createAccessToken(user));
  debug('Le accessToken a été actualisé.');
  next();
};

module.exports = refreshAccessToken;