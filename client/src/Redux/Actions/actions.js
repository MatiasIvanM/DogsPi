
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

    
   
      export const filterByOrigin = (origin) => {
        return {
          type: "FILTER_BY_ORIGIN",
          payload: origin,
        };
      };  


      
      export function createDog(dogData) {
        return async function (dispatch) {
          try {
            const response = await axios.post('http://localhost:3001/create', dogData);
            if (response.status === 200) {
              console.log('Raza creada exitosamente:', response.data);
              dispatch({
                type: 'ADD_NEW_DOG',
                payload: response.data,
              });
            }
          } catch (error) {
            console.error('Error al crear la raza:', error);
          }
        };
      }  

