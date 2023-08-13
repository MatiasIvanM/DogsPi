require("dotenv").config();
const { Dog, Temperament } = require('../db');

const createDog = async (req, res) => {
  try {
    const {
      name,
      height,
      weight,
      life_span,
      image,
      temperaments
    } = req.body;

    if (name && height && weight && temperaments) {
      const newDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        life_span: life_span,
        image: image
      });

      for (const temperament of temperaments) {
        const findTemp = await Temperament.findOne({
          where: { name: temperament }
        });
        if (findTemp) {
          await newDog.addTemperament(findTemp);
        }
      }

      const response = {
        id: newDog.id,
        image: newDog.image,
        name: newDog.name,
        height: height,
        weight: weight,
        life_span: newDog.life_span,
        temperament: temperaments,
        createdInDB: true
      };
      console.log("🚀 ~ file: postDogs.js:43 ~ createDog ~ response:", response)
      
      res.status(200).send(response);
      console.log("🚀 ~ file: postDogs.js:45 ~ createDog ~ response:", response)
    } else {
      res.status(400).send('Please Complete All Required Fields');
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send('An error occurred while creating the dog entry');
  }
};

module.exports = {
  createDog,
};
