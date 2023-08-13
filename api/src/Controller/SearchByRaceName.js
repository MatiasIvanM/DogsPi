require("dotenv").config();
const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db');
const { API_KEY, URL } = process.env;


async function searchDogs(req, res) {
  const searchTerm = req.query.q;

  try {
    const response = await axios.get(URL, {
      params: {
        q: searchTerm,
        API_KEY: API_KEY,
      },
    });

    const data = response.data;
   // Filter the data that match the search term
   const apimatchedBreeds = data.filter((breed) => breed.name.toLowerCase().includes(searchTerm.toLowerCase()));

   // Map the filtered data
   const apimatchedBreedDetails = apimatchedBreeds.map((breed) => {
     return {
       id: breed.id,
       image: breed.image.url,
       name: breed.name,
       height: breed.height,
       weight: breed.weight,
       life_span: breed.life_span,
       temperament: breed.temperament,
     };
   });

   const localMatchedBreeds = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${searchTerm}%`,
      },
    },
  });

//merge data 
  const allMatchedBreeds = [...apimatchedBreedDetails, ...localMatchedBreeds];

  if (allMatchedBreeds.length === 0) {
    return res.status(404).json({ error: 'No se encontraron resultados para la búsqueda.' });
  } else {
   return res.json( allMatchedBreeds )};
 } catch (error) {
   console.error('Error occurred during API request:', error.message);
   //return res.status(500).json({ error: 'Internal server error.' });
   return res.status(400).json({ error: 'Search term is missing in the request.' });
 }
}

module.exports = searchDogs;
