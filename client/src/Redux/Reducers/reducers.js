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


const initialState = {
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
  originFilter: "Todos",
};

const compareByWeight = (a, b) => {
  const weightA = parseInt(a.weight.metric.split(" - ")[0]);
  const weightB = parseInt(b.weight.metric.split(" - ")[0]);

  if (weightA < weightB) {
    return -1;
  }
  if (weightA > weightB) {
    return 1;
  }
  return 0;
};


const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      const filteredTemperaments = action.payload.filter(
        (temp) => temp.name !== ""
      );
      return {
        ...state,
        temperaments: filteredTemperaments,
      };

    case "GET_FILTER_TEMPERAMENTS":
      if (action.payload === "Todos") {
        return {
          ...state,
          dogs: state.allDogs,
        };
      } else {
        const filteredByTemperaments = state.allDogs.filter((dog) => {
          return dog.temperament && dog.temperament.includes(action.payload);
        });
        return {
          ...state,
          dogs: filteredByTemperaments,
        };
      }

      case "FILTER_BY_ORIGIN":
        const filteredByOrigin = action.payload === "DB"
          ? state.allDogs.filter((dog) => dog.origin === "DB")
          : action.payload === "API"
          ? state.allDogs.filter((dog) => dog.origin === "API")
          : state.allDogs;

        return {
          ...state,
          dogs: filteredByOrigin,
          originFilter: action.payload,
        };
        

    case "ORDER_BY_WEIGHT":
      const { min, max } = action.payload;
      const sortedByWeight = state.dogs.slice().sort((a, b) => {
        // eslint-disable-next-line no-unused-vars
        const weightA = parseInt(a.weight.metric.split(" - ")[0]);
        // eslint-disable-next-line no-unused-vars
        const weightB = parseInt(b.weight.metric.split(" - ")[0]);

        if (min === 1 && max === 100) {
          // Ascendente: de liviano a pesado
          return compareByWeight(a, b);
        } else if (min === 100 && max === 1) {
          // Descendente: de pesado a liviano
          return compareByWeight(b, a);
        } else {
          // En caso de otros valores, no se aplica ordenamiento
          return 0;
        }
      });

      return {
        ...state,
        dogs: sortedByWeight,
      };

      case "ORDER_BY_NAME":
        const sortedByName = action.payload === "A-Z"
          ? state.dogs.slice().sort((a, b) => a.name.localeCompare(b.name)) // Ordenar de A-Z
          : state.dogs.slice().sort((a, b) => b.name.localeCompare(a.name)); // Ordenar de Z-A

        return {
          ...state,
          dogs: sortedByName,
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