
import axios from 'axios';

/* const url = axios.create({
    baseURL: 'http://localhost:3001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}); */

export function getAllDogs() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/dogs`);
        return dispatch({
            type: "GET_ALL_DOGS",
            payload: json.data
        });
    }
};

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/temperaments`);
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data,
        });
      }  
  };


  export function filterByTemperament(payload){
    return{
        type: "GET_FILTER_TEMPERAMENTS",
        payload
    }
  };

  export function getName(name) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/raza/search?q=${name}`);
        return dispatch({
          type: "GET_NAME",
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

export function orderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};


export function orderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
};



export function showDogDetails(id) {
    return async function (dispatch) {
    try {
         const response = await axios.get(`http://localhost:3001/dog/${id}`);
         const data = response.data;
         dispatch({
          type: "SHOW_DOG_DETAILS",
          payload: data,
          });
        } catch (error) {
            console.log(error);
        }
        };
    }
    //modificacin para acceder a la axios por image_reference
    /* export function showDogDetails(id) {

        return async function (dispatch) {
          try {
            const response = await axios.get(`${axios}/dog/${id}`);
            const details = response.data;
      
            // Si hay un reference_image_id, hacemos otra petición para obtener la axios de la imagen
            if (details.reference_image_id) {
              const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${details.reference_image_id}`);
              const imageDetails = imageResponse.data;
              details.image.axios = imageDetails.url; // Agregamos la URL de la imagen a los detalles
            }
      
            return dispatch({
              type: "SHOW_DOG_DETAILS",
              payload: details,
            });
          } catch (error) {
            console.log(error);
          }
        };
      } */
   
      export const filterByOrigin = (origin) => {
        return {
          type: "FILTER_BY_ORIGIN",
          payload: origin,
        };
      };  


      export const createDog = (dogData) => async (dispatch) => {
        try {
          const response = await axios.post('http://localhost:3001/create', dogData);
          if (response.status === 200) {
            // Obtén el nuevo perro creado del objeto response
            const newDog = response.data;
            // Dispara una acción para agregar el nuevo perro al estado global
            dispatch({
              type: "ADD_NEW_DOG",
              payload: newDog,
            });
          }
        } catch (error) {
          throw error;
        }
      };

