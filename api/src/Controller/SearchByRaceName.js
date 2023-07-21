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


//segunda opcion
/* const dbRaza = async (name) => {
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
  const apiRaza = await axios.get(`${URL}/search?q=${name}?API_KEY=${API_KEY}`)
  console.log("🚀 ~ file: SearchByRaceName.js:56 ~ apiRaza ~ apiRaza:", apiRaza.data)
  return apiRaza.data;

}


const searchDogsByName = async (req, res) => {
  const name = req.params.name.toLowerCase();
  try{
    if(!name){
      const allDogs = [...apiRaza(), ...dbRaza()];
      return res.status(200).send(allDogs);
    }
  }catch (error){
    res.status(404).send({error:error.message})
  }  
} */


/* const searchDogsByName = async (req, res) => {
  
  try{
    const allDogsResult = await getDogs();
  if(req.query.name.hasOwnProperty('name'))
  let {name}= req.query;
  let found = false;
  var nameRaza=[];
  
  for(let i=0; i<allDogsResult.length; i++){
    if (allDogsResult[i].name.includes(name)){
        nameRaza.push(allDogsResult[i])
        found = true;
      }
     }
  

  res.status(200).send(nameRaza);

} catch(error){
  res.status(404).send({error:error.message})
}
};

module.exports = searchDogsByName; */

//the function is working, pending fix some implementation for the cuantity results
async function searchDogs(req, res) {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is missing in the request.' });
  }

  try {
    const response = await axios.get(URL, {
      params: {
        q: searchTerm,
        API_KEY: API_KEY,
      },
    });

    const data = response.data;
   // Filter the data that match the search term
   const matchedBreeds = data.filter((breed) => breed.name.toLowerCase().includes(searchTerm.toLowerCase()));

   // Map the filtered data
   const matchedBreedDetails = matchedBreeds.map((breed) => {
     return {
       id: breed.id,
       image: breed.image,
       name: breed.name,
       height: breed.height,
       weight: breed.weight,
       life_span: breed.life_span,
       temperament: breed.temperament,
     };
   });

   return res.json({ matchedBreeds: matchedBreedDetails });
 } catch (error) {
   console.error('Error occurred during API request:', error.message);
   return res.status(500).json({ error: 'Internal server error.' });
 }
}

module.exports = searchDogs;
