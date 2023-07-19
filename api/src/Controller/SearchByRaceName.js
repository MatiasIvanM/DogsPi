const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db');
const { API_KEY, URL } = process.env;

const searchDogsByName = async (req, res) => {
  const { name } = req.query;
  try {
    // Buscar en la base de datos
    const dbDogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`, // Búsqueda por coincidencia de nombre (sin distinguir mayúsculas o minúsculas)
        },
      },
      include: {
        model: Temperament,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
    });

    // Buscar en la API
    const apiResponse = await axios.get(`${URL}/search?q=${name}&api_key=${API_KEY}`);
  /*   const apiDogs = apiResponse.data; */
    const apiDogs = apiResponse.data.map((dog)=>({
        id: dog.id,
        image: dog.image,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span:dog.life_span,
        temperament: dog.temperament,
    })); 
    console.log("🚀 ~ file: SearchByRaceName.js:37 ~ apiDogs ~ apiDogs:", apiDogs)

    // Combinar resultados de la base de datos y de la API
    const dogs = [...dbDogs, ...apiDogs];

    if (dogs.length === 0) {
      return res.status(404).send('No se encontraron razas de perros con ese nombre');
    }

    res.status(200).send(dogs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error al buscar las razas de perros por nombre' });
  }
};


module.exports = searchDogsByName;