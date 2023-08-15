require("dotenv").config();
const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY, URL } = process.env;
const getImageApi = require('./getImageApi');

const getRazaDb = async (idSearch) => {
  const resultDb = await Dog.findByPk(idSearch, {
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  const temperaments = resultDb.Temperaments.map(temp => temp.name).join(', ');

  const modifiedResult = {
    ...resultDb.toJSON(),
    temperament: temperaments,
  };

  //console.log("🚀 ~ file: IdRaza.js:17 ~ getRazaDb ~ resultDb:", modifiedResult);
  
  return modifiedResult;
};

const getRazaApi = async (idSearch) => {
  const response = await axios.get(`${URL}/${idSearch}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
  
  let  aux = {...response.data, image: await getImageApi(response.data.reference_image_id)}
    return aux;
};

const getIdRaza = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length > 3) {
      const dogRazaDb = await getRazaDb(id);
      return res.status(200).send(dogRazaDb);
    } else {
      const dogRazaApi = await getRazaApi(id);
      return res.status(200).send(dogRazaApi);
    }
  } catch (error) {
    console.error("Error in getIdRaza:", error);
    return res.status(404).send('No se encontraron resultados para tu búsqueda, woof!');
  }
};


module.exports = {
  getIdRaza,
};

/* const axios = require("axios");
const { API_KEY , URL} = process.env;
const { Dog, Temperament } = require("../db");
const getImages = require("./getImageApi");

const getIdRaza = async (idRaza) => {
  try {
    if (idRaza > 3)
      return await Dog.findByPk(idRaza, {
        include: [
          {
            model: Temperament,
          },
        ],
      });

    let { data } = await axios.get(`${URL}/${idRaza}`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    let aux = { ...data, image: await getImages(data.reference_image_id) };

    return aux;
  } catch (error) {
    throw error.message;
  }
};

module.exports = getIdRaza; */
