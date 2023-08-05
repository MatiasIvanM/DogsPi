const cloudinary = require('cloudinary').v2;
const { cloud_name, api_key_cloud, api_secret }= process.env

// Configura Cloudinary con tus credenciales
cloudinary.config({
    cloud_name: `${cloud_name}`,
    api_key: `${api_key_cloud}`,
    api_secret: `${api_secret}`,
  });

const uploadImageToCloudinary = async (file) => {
  try {
    const uploadedImage = await cloudinary.uploader.upload(file.path, {
      folder: 'dog_images', // Carpeta donde se guardará la imagen en Cloudinary
      use_filename: true, // Utiliza el nombre original del archivo
      unique_filename: false, // Permite que varios perros tengan la misma imagen
    });

    // Devuelve la URL de la imagen en Cloudinary
    return uploadedImage.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error.message);
    throw new Error('Error al subir la imagen a Cloudinary.');
  }
};

module.exports = uploadImageToCloudinary;