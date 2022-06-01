const multer = require('multer');

const allowedFormats = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/vnd.microsoft.icon'];

const storageProfilePic = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, './src/uploads/');
    },
    filename: (req, file, cb) => {
      req.fileName = file.originalname;
      cb(null, req.fileName);
    },
  },
);

const optionsProfilePic = {
  storage: storageProfilePic,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    if (!allowedFormats.includes(file.mimetype)) {
      cb(null, false);
      return cb(new Error('Seuls les formats .png, .gif, .jpg, .webp et .ico sont autorisés.'));
    }
    return cb(null, true);
  },
};

const uploadProfilePic = multer(optionsProfilePic).single('picture');

module.exports = (req, res, next) => uploadProfilePic(req, res, (err) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ errorMessage: err.message });
  }
  next();
});
