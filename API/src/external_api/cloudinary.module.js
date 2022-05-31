const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const APIError = require('../Errors/APIError');

const cloudinaryUpload = {
  options: {
    folder: 'cinevoraces',
    tags: 'avatar',
    width: 100,
    height: 100,
    crop: 'fill',
    gravity: 'faces',
    format: 'jpg',
  },
  async uploadThumbnail(CLOUDINARY_URL, userPseudo, fileName) {
    cloudinary.config({
      cloudinary_url: CLOUDINARY_URL,
    });
    const { options } = cloudinaryUpload;
    options.public_id = userPseudo;
    const imagePath = path.resolve(__dirname, `../uploads/${fileName}`);
    const upload = await cloudinary.uploader.upload(imagePath, options);
    if (!upload) throw new APIError('Le chargement de la ressource a échoué.', '', 400);
    fs.rm(imagePath);
    return upload.url;
  },
};

module.exports = cloudinaryUpload;
