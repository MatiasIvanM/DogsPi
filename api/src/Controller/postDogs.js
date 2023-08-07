//pendinte creacion post
const { Dog, Temperament } = require('../db');
const uploadImageToCloudinary = require('./uploadImageCloudinary');

const saveDog = async (req, res) => {
        const {
          name,
          height,
          weight,
          life_span,
          image,
        } = req.body;
        if (!name || !height || !weight || !life_span || !image) {
          return res
            .status(404)
            .send({ error: 'You must fill all the fields' });
        }
        try {
          let newDog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
          });
    
          temperament.forEach(async (el) => {
            let tempToAdd = await Temperament.findOne({ where: { name: el } });
            await newDog.addTemperament(tempToAdd);
          });
    
          res.status(200).send("Breed created");
        } catch (error) {
          return res.status(404).send({ error: error.message });
        }
    };

module.exports = saveDog;
