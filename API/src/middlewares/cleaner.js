const sanitizer = require('sanitizer');

const sanitize = (obj) => {
  // eslint-disable-next-line guard-for-in
  for (const prop in obj) {
    // eslint-disable-next-line no-param-reassign
    obj[prop] = sanitizer.unescapeEntities(obj[prop]);
  }
};

const cleaner = (request, response, next) => {
  sanitize(request.params);
  sanitize(request.query);
  if (request.body) {
    console.log(request.body);
    sanitize(request.body);
    console.log(request.body);
  }
  next();
};

module.exports = cleaner;
