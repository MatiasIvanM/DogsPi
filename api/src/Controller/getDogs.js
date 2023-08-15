require("dotenv").config();
const axios = require ('axios');
const { Dog, Temperament } = require ('../db');
const {API_KEY, URL} = process.env;

//GET de all dogs 
const getDogs = async (req, res) => {
    try {
        const DbDogs = await Dog.findAll({
            include: {
              model: Temperament,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          });

          const formattedDogs = DbDogs.map((dog) => {
            const { Temperaments, ...dogData } = dog.toJSON();
            return {
              ...dogData,
              temperament: Temperaments.map((t) => t.name).join(", "),
            };
          });
          /* console.log("🚀 ~ file: getDogs.js:23 ~ formattedDogs ~ formattedDogs:", formattedDogs) */

        // [{},{},{},{},{},{},{},{},{},]
        
        const apiDogs = await axios.get(`${URL}?api_key=${API_KEY}`);
        const apiDogsData = apiDogs.data;
        

         const allDogs = apiDogsData.map((el)=>({
            id: el.id,
             image: el.image.url,
             name: el.name,
             height: el.height,
            weight:el.weight,
             life_span:el.life_span,
             temperament: el.temperament,
            })); 
            
            
            let allDogsResult = [...formattedDogs,...allDogs];
            res.status(200).send(allDogsResult);
          }
          catch(error){
            res.status(404).send({error: error.message});
    }
};


module.exports ={
  getDogs,
};

/* id: el.id,   //este fragmento permite traer todos los perror con el formateados
name: el.name,
heightMin: + el.height.metric.split(' - ')[0],
heightMax: + el.height.metric.split(' - ')[1] ?
    + el.height.metric.split(' - ')[1] :
    Math.round(el.height.metric.split(' - ')[0] * 1.1),
weightMin: + el.weight.metric.split(' - ')[0] !== "NaN" ?
    + el.weight.metric.split(' - ')[0] :
    (el.weight.metric.split(' - ')[1] ?
        Math.round(el.weight.metric.split(' - ')[1] * 0.6) :
        '30'),//Math.round(el.weight.imperial.split(' - ')[1] * 0.6 / 2.205).toString()),
weightMax: + el.weight.metric.split(' - ')[1] ?
    + el.weight.metric.split(' - ')[1] :
    '39',//Math.round(parseInt(el.weight.imperial.split(' - ')[1]) / 2.205).toString(),
life_span: el.life_span,
temperaments: el.temperament ? el.temperament : null,
image: el.image.url, */