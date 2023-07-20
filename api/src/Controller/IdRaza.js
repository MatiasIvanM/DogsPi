const axios = require('axios');
const { Dog, Temperament } = require('../db');
const { API_KEY, URL } = process.env;

const getRazaDb = async (idSearch) => {
  const resultDb = await Dog.findByPk(idSearch, {
    include: {
      model: Temperament,
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      },
    },
  });
  return resultDb;
};

const getRazaApi = async (idSearch) => {
  const response = await axios.get(`${URL}/${idSearch}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  });
   /*  const dogApi = response.data.map((e) =>({
      id: e.id,
      image: e.image.url,
      name: e.name,
      height: e.height,
      weight: e.weight,
      life_span: e.life_span,
      temperament: e.temperament,
    })); NOT WORKIN*/
    
    return response.data;
};

const getIdRaza = async (req, res) => {
  const {id} = req.params;
  try {
    if (id.length = NaN) {
      const dogRazaDb = await getRazaDb(id);
      return res.status(200).send(dogRazaDb);
    } else {
      const dogRazaApi = await getRazaApi(id);
      return res.status(200).send(dogRazaApi);
    }
  } catch (error) {
    return res.status(404).send('No se encontraron resultados para tu búsqueda, woof!');
  }
};


module.exports = {
  getIdRaza,
};


