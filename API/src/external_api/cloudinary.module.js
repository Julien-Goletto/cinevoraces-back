const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const APIError = require('../Errors/APIError');

const cloudinaryUpload = {
  options: {
    folder: 'cinevoraces',
    tags: 'avatar',
    width: 200,
    height: 200,
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
    console.log(imagePath);
    if (!fs.existsSync(imagePath)) {
      return ("Le fichier a supprimer n'existe pas / plus.");
    }
    fs.rm(imagePath, { recursive: true }, (err) => {
      if (err) {
        throw new APIError(err.message, '', 400);
      }
    });
    return upload.url;
  },
};

module.exports = cloudinaryUpload;
