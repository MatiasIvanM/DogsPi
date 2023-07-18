const axios = require ('axios');
const { Dog, Temperament } = require ('../db');
const {API_KEY, URL} = process.env;

//GET de all dogs 
const getDogs = async (req, res) => {
    try {
        const DbDogs = await Dog.findAll({
            includes: {
                model: Temperament,
                atribuites: ["name"],
                throgh:{
                    atribuites: [],
                },
            },
        });
        
        const apiDogs = await axios.get(`${URL}api_key?${API_KEY}`);
        const apiDogsData = apiDogs.data;
        

         const allDogs = apiDogsData.map((dog)=>({
            id: dog.id,
            image: dog.image,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span:dog.life_span,
            temperament: dog.temperament,
        })); 
        //include tem resolv

        let allDogsResult = [...DbDogs,...allDogs];

        res.status(200).send(allDogsResult);
    }
    catch(error){
        res.status(404).send({error: error.message});
    }
};


module.exports ={
    getDogs,
};


