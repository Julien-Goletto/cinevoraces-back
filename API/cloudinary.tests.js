require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');

const { CLOUDINARY_URL } = process.env;
cloudinary.config({
  cloudinary_url: CLOUDINARY_URL,
});

const options = {
  folder: 'cinevoraces',
  tags: 'avatar',
  width: 200,
  height: 200,
  crop: 'fill',
  gravity: 'faces',
  format: 'jpg',
};

async function uploadThumbnails(rPathTofolder) {
  const imagesToUpload = [];
  fs.readdirSync(rPathTofolder).forEach((file) => {
    imagesToUpload.push(path.resolve(__dirname, `./${rPathTofolder}/${file}`));
  });
  const uploadsPromises = [];
  for (const image of imagesToUpload) {
    const imageName = image.split('/')[7].slice(0, -4);
    options.public_id = imageName;
    const upload = cloudinary.uploader.upload(image, options);
    uploadsPromises.push(upload);
    // pseudoUrlPromises.push({ pseudo: imageName, url: upload.url });
  }
  const uploads = await Promise.all(uploadsPromises);
  const dataToExtract = ['original_filename', 'url', 'secure_url'];
  return uploads.map(
    (upload) => Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(upload).filter(([key, _]) => dataToExtract.includes(key)),
    ),
  );
}

uploadThumbnails('./images').then((result) => console.log(result));
