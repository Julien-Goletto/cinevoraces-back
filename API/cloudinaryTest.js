require('dotenv').config();
const path = require('path');
const cloudinaryUpload = require('./src/external_api/cloudinary.module');

const { CLOUDINARY_URL } = process.env;
const userPseudo = 'Yves Signal';
const sourceImage = path.join(__dirname, '../../Calys.png');

cloudinaryUpload
  .uploadThumbnail(CLOUDINARY_URL, userPseudo, sourceImage)
  .then((result) => console.log(result));
