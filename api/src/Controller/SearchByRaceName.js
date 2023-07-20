const axios = require('axios');
const { Op } = require('sequelize');
const { Dog, Temperament } = require('../db');
const { API_KEY, URL } = process.env;

/* const searchDogsByName = async (req, res) => {
    let misperros = await Dog.findAll()
    let misperrosParse = []    
    for (let i = 0; i < misperros.length; i++) {
        let perrito = misperros[i];
        let temperaments = await perrito.getTemperaments() 
        perrito = perrito.dataValues;
        temperaments = temperaments.map((el) => el.dataValues.name)
        perrito.temperament = temperaments.toString()
        misperrosParse.push(perrito)
    }
    axios.get(`${URL}/search?q=${req.params}`)
        .then(respuesta => {
            let resultado = [...misperrosParse, ...respuesta.data].filter((el) => 
                el.name.toLowerCase().includes(req.params.name.toLowerCase()))
            if (resultado.length === 0) {
                res.send(resultado)//llega a esta respuesta 
            }
            if(resultado.length > 0 && resultado.length < 9) {
                res.send(resultado)
            }
            else if(resultado.length > 8) {
                let nuevoarray = resultado.slice(0, 8)
                res.send(nuevoarray)
            } 
            res.end()
        })        
        .catch(error => {
            console.log(error)

        })
        
}; */

const dbRaza = async (name) => {
  const razaDb = await Dog.findAll({
    where: {
      name: {
       [Op.iLike]: `%${name}`
      }
    }
  })
  console.log(razaDb);
  return razaDb;

};

const apiRaza = async (name) => {
  const apiRaza = await axios.get(`${URL}/search?q=${name}`)
  console.log("🚀 ~ file: SearchByRaceName.js:56 ~ apiRaza ~ apiRaza:", apiRaza)
  return apiRaza;

}


const searchDogsByName = async (req, res) => {
  const name = req.params.name.toLowerCase();
  try{
    if(!name){
      const allDogs = await dbRaza();
      return res.status(200).send(allDogs);
    }
  }catch (error){
    res.status(404).send({error:error.message})
  }  
}

module.exports = searchDogsByName;
