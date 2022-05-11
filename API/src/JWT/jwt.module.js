const debug = require('debug')('JWT');

const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = process.env;
const jwtATConfig = {
  expiresIn: 5,
  algorithm: 'HS256',
};
const jwtRTConfig = {
  expiresIn: '1y',
  algorithm: 'HS256',
};

const jwtMethods = {
  createAccessToken(payload){
    return jwt.sign({...payload},ACCESS_TOKEN_SECRET,jwtATConfig);
  },
  createRefreshToken(payload){
    return jwt.sign({...payload},REFRESH_TOKEN_SECRET,jwtRTConfig);
  },

  decryptAccessToken(accessToken){
    return jwt.verify(accessToken,ACCESS_TOKEN_SECRET);
  },
  decryptRefreshToken(refreshToken){
    return jwt.verify(refreshToken,REFRESH_TOKEN_SECRET);
  },
  checkTokenContent(token){
    return ('id' in token && 'pseudo' in token && 'role' in token && 'iat' in token && 'exp' in token);
  },
  checkTokenAuthorization(token){
    debug(token);
    return token.role === 'admin';
  },
  cookieParser(cookie){
    const cookiesToParse = cookie.split('; ');
    let cookies = [];
    for (let cookie of cookiesToParse){
      cookies.push ({...cookie.split('=')});
    };
    return cookies.map(item => {return {name: item[0],cookie: item[1]}});
  },
  cookieFinder(cookies, cookieToFind){
    for (const cookie of cookies){
      if(cookie.name === `${cookieToFind}`){return cookie.cookie};
    };
  },
  refreshAccessToken(cookie){
    // On récupère le refresh token
    const user = jwtMethods.decryptRefreshToken(jwtMethods.cookieFinder(jwtMethods.cookieParser(cookie),'refreshToken'));
    // Vérification présence user en bdd
    delete user.iat;
    delete user.exp;
    return accessToken = jwtMethods.createAccessToken(user);
  }
};

module.exports = jwtMethods;