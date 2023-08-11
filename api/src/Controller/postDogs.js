const { Dog, Temperament } = require('../db');

const createDog = async (req, res) => {
  const {
    name,
    height,
    weight,
    life_span,
    image,
    temperaments
  } = req.body;

  if (name && height.metric && weight.metric && temperaments) {
    const newDog = await Dog.create({
      name: name,
      height: JSON.stringify(height),
      weight: JSON.stringify(weight),
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
      height: JSON.parse(newDog.height),
      weight: JSON.parse(newDog.weight),
      life_span: newDog.life_span,
      temperament: temperaments.join(', '),
      createdInDB: true // Agregar la propiedad createdInDB
    };

    res.status(200).json(response);
  } else {
    res.status(400).send('Please Complete All Required Fields');
  }
};

module.exports = {
  createDog,
};

module.exports = {
  createDog,
};