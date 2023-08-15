require("dotenv").config();
const axios = require('axios');
const { Op } = require('sequelize');
const { Dog,  } = require('../db');
const getImageApi = require('./getImageApi');
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
   const apimatchedBreedDetails = await Promise.all(apimatchedBreeds.map(async (breed) => {
    const imageUrl = await getImageApi(breed.reference_image_id);
     return {
       id: breed.id,
       image: imageUrl,
       name: breed.name,
       height: breed.height,
       weight: breed.weight,
       life_span: breed.life_span,
       temperament: breed.temperament,
     };
    }));


   const localMatchedBreeds = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${searchTerm}%`,
      },
    },
  });

//merge data 
//image pushing 

  const allMatchedBreeds = [...localMatchedBreeds, ...apimatchedBreedDetails];

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
