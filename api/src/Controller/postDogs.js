const { Dog, Temperament } = require('../db');

const createDog = async (req, res) => {
  console.log(req.body)
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
      temperament: temperaments.join(', '),
      createdInDB: true // Agregar la propiedad createdInDB
    };
    

    res.status(200).json(response);
    console.log("🚀 ~ file: postDogs.js:44 ~ createDog ~ response:", response)
  } else {
    res.status(400).send('Please Complete All Required Fields');
  }
};

module.exports = {
  createDog,
};