const bcrypt = require('bcryptjs');

const bcryptMethod = {
  salt: bcrypt.salt(saltRound),
  async hash(password) {
    return bcrypt.hash(password, bcryptMethods.salt);
  },
};

module.exports = bcryptMethod;
