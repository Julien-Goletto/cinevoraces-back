const jwt = require('jsonwebtoken');
const APIError = require('../Errors/APIError');

const ACCESS_TOKEN_SECRET = `${process.env.ACCESS_TOKEN_SECRET}`;
const REFRESH_TOKEN_SECRET = `${process.env.REFRESH_TOKEN_SECRET}`;

const jwtATConfig = {
  expiresIn: 60,
  algorithm: 'HS256',
};
const jwtRTConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const jwtMethods = {
  createAccessToken(payload) {
    return jwt.sign({ ...payload }, ACCESS_TOKEN_SECRET, jwtATConfig);
  },
  createRefreshToken(payload) {
    return jwt.sign({ ...payload }, REFRESH_TOKEN_SECRET, jwtRTConfig);
  },

  decryptAccessToken(accessToken) {
    return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
  },
  decryptRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
  },
  checkTokenContent(token) {
    return ('id' in token && 'pseudo' in token && 'role' in token && 'iat' in token && 'exp' in token);
  },
  checkTokenAuthorization(token) {
    return token.role === 'admin';
  },
  cookieParser(cookie) {
    const cookiesToParse = cookie.split('; ');
    const cookies = [];
    for (const c of cookiesToParse) {
      cookies.push({ ...c.split('=') });
    }
    return cookies.map((item) => ({ name: item[0], cookie: item[1] }));
  },
  cookieFinder(cookies, cookieToFind) {
    for (const cookie of cookies) {
      if (cookie.name === `${cookieToFind}`) {
        return cookie.cookie;
      }
    }
    throw new APIError('No cookie found.');
  },
};

module.exports = jwtMethods;
