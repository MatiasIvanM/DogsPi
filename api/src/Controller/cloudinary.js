const cloudinary = require('cloudinary').v2;
const { cloud_name, api_key_cloud, api_secret } = process.env;

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key_cloud,
  api_secret: api_secret,
});

const uploadImageToCloudinary = async (file) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(file.path, {
      folder: 'dog_images',
      use_filename: true,
      unique_filename: false,
    });

    return uploadedImage.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error.message);
    throw new Error('Error al subir la imagen a Cloudinary.');
  }
};

module.exports = uploadImageToCloudinary;