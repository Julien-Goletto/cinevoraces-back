const multer = require('multer');
const APIError = require('../Errors/APIError');

const upload = {
  allowedFormats: ['image/png', 'image/gif', 'image/jpeg', 'image/webp', 'image/vnd.microsoft.icon'],
  options: {
    storage: multer.diskStorage(
      {
        destination: (req, file, callback) => {
          callback(null, '../uploads');
        },
        filename: (req, file, callback) => {
          req.fileName = file.originalname;
          callback(null, req.fileName);
        },
      },
    ),
    limits: { fileSize: 5000 },
    fileFilter: (req, file, callback) => {
      if (!upload.allowedFormats.includes(file.mimetype)) {
        callback(null, false);
        return callback(new Error('Seuls les formats .png, .gif, .jpg, .webp et .ico sont autorisés.'));
      }
      return callback(null, true);
    },
  },
  avatar(err, req, res, next) {
    if (err) {
      throw new APIError('Seuls les formats .png, .gif, .jpg, .webp et .ico sont autorisés.', req.url, 400);
    }
    multer(upload.options).single('picture');
    next();
  },
};

module.exports = upload;
