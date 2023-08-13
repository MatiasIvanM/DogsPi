require("dotenv").config();
const axios = require ('axios');
const { Temperament } = require ('../db');
const {API_KEY, URL} = process.env;
 
/*   //ERROR NOT NULL VIOLATION
  const getTemperament = async (req, res) => {
    try {
      // Buscar en la base de datos
      let dbTemperament = await Temperament.findAll();
      dbTemperament = JSON.stringify(dbTemperament, null, 2);
      dbTemperament = JSON.parse(dbTemperament);
      
      if (dbTemperament.length !== 0) {
        res.send(dbTemperament);
      } else {
        const response = await axios.get(`${URL}?api_key=${API_KEY}`);
        let temperamentFinal = [];
        let temperamentAux = response.data.map((elem) => elem.temperament);
        let newTemperamt = temperamentAux.map((elem) => elem && elem.split(",")).flat();
        
        newTemperamt.forEach((elem) => {
          if (temperamentFinal.indexOf(elem) < 0) temperamentFinal.push(elem);
        });
        
        for (let i = 0; i < 0; i++) {
          await Temperament.create({
            name: temperamentFinal[i],
          });
        }
        
        res.status(200).send(temperamentFinal.slice(9, 19));
      }
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  };
 */
const getTemperaments = async (req, res) => {
    try {
      // Buscar en la base de datos
      let dbTemperaments = await Temperament.findAll();
  
      if (dbTemperaments.length !== 0) {
        res.send(dbTemperaments);
      } else {
        const response = await axios.get(`${URL}?api_key=${API_KEY}`);
        const breeds = response.data;
  
        const temperaments = new Set();
  
        breeds.forEach((breed) => {
          if (breed.temperament) {
            const breedTemperaments = breed.temperament.split(", ");
            breedTemperaments.forEach((temperament) => {
              temperaments.add(temperament);
            });
          }
        });
  
        const temperamentList = Array.from(temperaments);
  
        const createdTemperaments = await Temperament.bulkCreate(
          temperamentList.map((name) => ({ name }))
        );
  
        res.status(200).send(createdTemperaments);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error al obtener los temperamentos" });
    }
  };
  
  module.exports = getTemperaments;
 
  
//MODELO ANTERIOR SE SUPLANTA PARA EXTRAER Y CREAR DATOS
/*  const apiTemp = await axios.get(`${URL}?api_key=${API_KEY}`);
 let apiMapTemp = apiTemp.data.result;
 apiTempResult = apiMapTemp.map(e=>{
     return{
         temperament:e.temperament,
     }
 }) */
