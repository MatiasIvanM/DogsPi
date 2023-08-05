/* const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    details:[]
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_DOGS_BY_NAME":
            return {
                ...state,
                allDogs: action.payload,
            }
        case 'GET_DOGS_BY_TEMP':
            return {
                ...state,
                allDogs: action.payload,
            }
        case 'GET_TEMPERAMENTS_LIST':
            return {
                ...state,
                temperaments: action.payload
            }
        case 'GET_DOGS_BY_BREED':
            const allDogs = state.dogs
            if (action.payload === 'all') return allDogs
            return {
                ...state,
                allDogs: action.payload,
                dogs: allDogs
            }
        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ?
                state.dogs.filter(el => el.createdInDB === true) :
                state.dogs.filter(el => !el.createdInDB);
            return {
                ...state,
                allDogs: createdFilter,
            }
        case 'ORDER_BY_NAME':
            const sortedArr = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (b.name > a.name) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if (a.name > b.name) { return -1; }
                    if (b.name > a.name) { return 1; }
                    return 0;
                })
            return {
                ...state,
                allDogs: sortedArr
            }
        case 'ORDER_BY_WEIGHT':
            const sortedWeight = action.payload === 'asc' ?
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return 1 }
                    if (b.weight_min < a.weight_min) { return -1 }
                    return 0;
                }) :
                [...state.dogs].sort(function (a, b) {
                    if(a.weight_min === null) { return 0 }
                    if (a.weight_min < b.weight_min) { return -1; }
                    if (b.weight_min < a.weight_min) { return 1; }
                    return 0;
                })
            return {
                ...state,
                allDogs: sortedWeight
            }
        case 'FILTER_BY_MAX_WEIGHT':
            const everyDog = state.allDogs
            const weightMAXFiltered = action.payload === 'all' ?
                everyDog :
                everyDog.filter(el => el.weight_max <= action.payload)
            return {
                ...state,
                allDogs: weightMAXFiltered
            }
        case 'FILTER_BY_MIN_WEIGHT':
            const allDoguis = state.allDogs
            const weightMINFiltered = action.payload === 'all' ?
                allDoguis :
                allDoguis.filter(el => el.weight_min >= action.payload)
            return {
                ...state,
                allDogs: weightMINFiltered
            }
        case 'POST_DOG':
            return {
                ...state
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            }
        case 'DELETE_DETAILS':
            return{
                ...state,
                details: []
            }
        default:
            return state
    }
} export default rootReducer; */

const inicialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    details:[]
};


const rootReducer = (state = inicialState, action) => {
 switch (action.type) {
    case "GET_ALL_DOGS":
      /*  action.payload.forEach(elem =>{
            if(!elem.temperaments[0]){
                elem.temperaments[0] = "No hay temperamentos"
            }
        }); */
        return {
        ...state,
         dogs: action.payload,
         allDogs: action.payload,
        };

    case "GET_TEMPERAMENTS": 
     const filteresTemp = action.payload.filter((temp) => temp.name !== "");
      return {
        ...state,
        temperaments: filteresTemp,
      };
        //revisar funcionamento del filtrado rompe por .find()is not a function
    case "GET_FILTER_TEMPERAMENTS":
      const allDogs = state.allDogs;
      let filteredDogs = [];
      if (action.payload === "Todos") {
        filteredDogs = allDogs;
      } else {
        for (let i = 0; i < allDogs.length; i++) {
          let found = allDogs[i].temperaments.find((t) => t === action.payload);
          if (found) {
            filteredDogs.push(allDogs[i]);
          }
        }
      }
      return {
        ...state,
        dogs: filteredDogs,
      };

    case "GET_BREED":
        return {
            ...state,
            dogs:  action.payload,
        };
    
    case "ORDER_BY_NAME":
        const sortedName =
        action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedName,
      };
        //no ordena por pesos , revisar funcinalidad 
    case "ORDER_BY_WEIGHT":
        const sortedWeight =
          action.payload === "min_weight"
            ? state.allDogs.sort((a, b) => {
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                  return 1;
                }
                if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                  return -1;
                }
                return 0;
              })
            : state.allDogs.sort((a, b) => {
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                  return -1;
                }
                if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          dogs: sortedWeight,
        };


        case "SHOW_DOG_DETAILS":
      const { payload } = action;
      return {
        ...state,
        details: payload,
      };
    default:
      return state;
 }
};
      
      



export default rootReducer;   


