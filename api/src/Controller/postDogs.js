//pendinte creacion post
const { Dog, Temperament } = require('../db');

/* const saveDog = async (req, res) => {
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

    const saveDog = async (req, res) => {
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
