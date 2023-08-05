/* import axios from 'axios';

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
        type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function filterDogsByMAXWeight(payload) {
    return {
        type: 'FILTER_BY_MAX_WEIGHT',
        payload
    }
}

export function filterDogsByMINWeight(payload) {
    return {
        type: 'FILTER_BY_MIN_WEIGHT',
        payload
    }
}

export function getDogsByName(name) {
    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        return dispatch({
            type: "GET_DOGS_BY_NAME",
            payload: data
        });
    };
}

export function getTemperamentsList() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/temperaments');
        var listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: 'GET_TEMPERAMENTS_LIST',
            payload: listOfTemperaments
        });
    }
}

export function postDog(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/create', payload);
        return response;
    }
}

export function getDogsByBreed(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/breedGroup?breedGroup=${payload}`);
            return dispatch({
                type: 'GET_DOGS_BY_BREED',
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

/* export function getBreeds() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/breedGroups');
        return dispatch({
            type: 'GET_BREEDS',
            payload: json.data
        });
    }
} */

/* export function filterDogsByTemperament(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dog/temperaments`);
            return dispatch({
                type: 'GET_DOGS_BY_TEMP',
                payload: json.data
            })
        } catch (error) {
            console.log(error, "Error on the filters in actions file")
        }
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dog/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: 'DELETE_DETAILS'
    })
}
}  */


import axios from 'axios';

const url = 'http://localhost:3001';

export function getAllDogs() {
    return async function (dispatch) {
        var json = await axios.get(`${url}/dogs`);
        return dispatch({//necesario para despachar la accion
            type: "GET_ALL_DOGS",
            payload: json.data
        });
    }
};

export function getTemperaments() {
    return async function (dispatch) {
        var json = await axios.get(`${url}/temperaments`);
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

  export function getName(payload) {//dogs by name
    return async function (dispatch) {//Dispatch que podemos usar gracias a la asincronia provista por el middleware thunk
        try {
            var json = await axios.get(`${url}/raza/:name${payload}`)
            return dispatch ({
                type: "GET_BREED",
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
};

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
            const response = await axios.get(`${url}/dog/${id}`);
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
    //modificacin para acceder a la url por image_reference
    /* export function showDogDetails(id) {

        return async function (dispatch) {
          try {
            const response = await axios.get(`${url}/dog/${id}`);
            const details = response.data;
      
            // Si hay un reference_image_id, hacemos otra petición para obtener la URL de la imagen
            if (details.reference_image_id) {
              const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${details.reference_image_id}`);
              const imageDetails = imageResponse.data;
              details.image.url = imageDetails.url; // Agregamos la URL de la imagen a los detalles
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
   
      export function postDog(payload) {
        return async function(dispatch) {
          try {
            const response = await axios.post(`${url}/create`, payload);

            alert('Nuevo perro creado exitosamente');

            console.log('Nuevo perro creado exitosamente:', response.data);
      
            return response.data;
          } catch (error) {
            alert('Error al crear el perro');
      
            console.error('Error al crear el perro:', error);
      
            throw error;
          }
        };
      }
      /* export function postDog(payload) {
        return async function () {
            const data = await axios.post(`${url}/create`, payload);
            return data;
        }
    } */

