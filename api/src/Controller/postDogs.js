//pendinte creacion post

const { Dog, Temperament } = require('../../src/db');
const uploadImageToCloudinary = require('./cloudinary');

// Ruta para manejar la petición POST
const postDog = async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;
  const file = req.file; // Obtén el archivo de imagen subido desde el cliente

  // Aquí puedes agregar cualquier validación adicional que necesites
  if (!name || !height || !weight || !life_span || !temperament || !file) {
    return res.status(400).json({ error: 'You must fill all the fields (image, name, height, weight, life_span, temperament).' });
  }

  try {
    // Sube la imagen a Cloudinary y obtén la URL pública de la imagen
    const image_url = await uploadImageToCloudinary(file);

    // Busca los temperamentos en la tabla 'temperaments'
    const temperamentsArray = temperament.split(',').map((t) => t.trim());
    const temperamentsToAdd = await Temperament.findAll({
      where: {
        name: temperamentsArray,
      },
    });

    // Crea el nuevo perro en la base de datos
    const newDog = await Dog.create({
      image: image_url, // Guarda la URL de la imagen en la base de datos
      name,
      height: `${height.imperial} (${height.metric})`,
      weight: `${weight.imperial} (${weight.metric})`,
      life_span,
    });

    // Asocia los temperamentos encontrados al nuevo perro
    await newDog.addTemperaments(temperamentsToAdd);

    console.log("New dog created:", newDog.toJSON());
    return res.status(200).json({ message: 'Breed created successfully.', dog: newDog });
  } catch (error) {
    console.error('Error occurred while creating a dog:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

// Exporta el router para usarlo en la aplicación principal
module.exports = postDog;

/* const saveDog = async (req, res) => {
  const cloudinary = require('cloudinary').v2;
const { cloudinaryConfig, Dog } = require('../models');

// Configura Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

const saveDog = async (req, res) => {
  const { name, height, weight, life_span, temperament } = req.body;
  const image = req.file; // Obtén el archivo de imagen subido desde el cliente

  if (!image || !name || !height || !weight || !life_span || !temperament) {
    // Verifica si se proporcionó la imagen y todos los campos necesarios
    return res.status(400).json({ error: 'You must fill all the fields (image, name, height, weight, life_span, temperament).' });
  }

  try {
    // Sube la imagen a Cloudinary y obtén la URL pública de la imagen
    const uploadedImage = await cloudinary.uploader.upload(image.path, {
      folder: 'dog_images', // Carpeta donde se guardará la imagen en Cloudinary
      use_filename: true, // Utiliza el nombre original del archivo
      unique_filename: false, // Permite que varios perros tengan la misma imagen
    });

    const imagePath = uploadedImage.secure_url; // Ruta a la imagen en Cloudinary

    const newDog = await Dog.create({
      image: imagePath, // Guarda la URL de la imagen en la base de datos
      name,
      height: `${height.imperial} (${height.metric})`,
      weight: `${weight.imperial} (${weight.metric})`,
      life_span,
      temperament,
    });

    const temperamentsArray = temperament.split(',').map((t) => t.trim());
    for (const temperamentName of temperamentsArray) {
      const temperamentToAdd = await Temperament.findOne({ where: { name: temperamentName } });
      if (temperamentToAdd) {
        await newDog.addTemperament(temperamentToAdd);
      }
    }

    console.log("New dog created:", newDog.toJSON());
    return res.status(200).json({ message: 'Breed created successfully.', dog: newDog });
  } catch (error) {
    console.error('Error occurred while creating a dog:', error.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = saveDog;
        const {
            imagen,
            name,
            height,
            weight,
            life_span,

        } = req.body;
        if (!name || !height || !weight || !life_span) {
          return res
            .status(404)
            .send({ error: 'You must fill all the fields' });
        }
        try {
          let newDog = await Dog.create({
            id,
            imagen,
            name,
            height,
            weight,
            life_span,
          });
          
          Temperament.forEach(async (el) => {
              let temperamentToAdd = await Temperament.findOne({ where: { name: el } });
              await newDog.addTemperament(temperamentToAdd);
            });
            console.log("🚀 ~ file: postDogs.js:27 ~ saveDog ~ newDog:", newDog)
    
          res.status(200).send("Breed created");
        } catch (error) {
          return res.status(404).send({ error: error.message });
        }
    }; */

   
 /*    const saveDog = async (req, res) => {
        const { image, name, height, weight, life_span, temperament } = req.body;
      
        if (!name || !height || !weight || !life_span || !temperament) {
          return res.status(400).json({ error: 'You must fill all the fields (image, name, height, weight, life_span, temperament).' });
        }
      
        try {
          const newDog = await Dog.create({
            imagen: image.url,
            name,
            height: `${height.imperial} (${height.metric})`,
            weight: `${weight.imperial} (${weight.metric})`,
            life_span,
            temperament,
          });
      
          const temperamentsArray = temperament.split(',').map((t) => t.trim());
          for (const temperamentName of temperamentsArray) {
            const temperamentToAdd = await Temperament.findOne({ where: { name: temperamentName } });
            if (temperamentToAdd) {
              await newDog.addTemperament(temperamentToAdd);
            }
          }
      
          console.log("New dog created:", newDog.toJSON());
          return res.status(200).json({ message: 'Breed created successfully.', dog: newDog });
        } catch (error) {
          console.error('Error occurred while creating a dog:', error.message);
          return res.status(500).json({ error: 'Internal server error.' });
        }
      };
      
      module.exports = saveDog;
 */