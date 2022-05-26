const cloudinary = require('cloudinary').v2;

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
  async uploadThumbnail(CLOUDINARY_URL, userPseudo, sourceImage) {
    cloudinary.config({
      cloudinary_url: CLOUDINARY_URL,
    });
    const { options } = cloudinaryUpload;
    options.public_id = userPseudo;
    const upload = await cloudinary.uploader.upload(sourceImage, options);
    return upload.url;
  },
};

module.exports = cloudinaryUpload;
