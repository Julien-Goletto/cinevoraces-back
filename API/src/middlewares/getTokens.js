const jwtMethods = require('../JWT/jwt.module');

const getTokens = {
  getRefreshToken(req, _, next) {
    let token;
    if (req.headers.cookie) {
      token = jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'refreshToken');
    } else if (req.headers.authorization) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
    }
    req.session.token = token;
    next();
  },
  getAccessToken(req, _, next) {
    let token;
    if (req.headers.cookie) {
      token = jwtMethods.cookieFinder(jwtMethods.cookieParser(req.headers.cookie), 'accessToken');
    } else if (req.headers.authorization) {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      req.session.token = token;
    }
    next();
  },
};

module.exports = getTokens;
