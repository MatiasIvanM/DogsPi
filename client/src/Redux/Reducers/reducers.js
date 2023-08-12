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
        const filteredByOrigin = state.allDogs.filter((dog) => {
          if (action.payload === "API") {
            // Filtrar los datos que no tienen la propiedad 'createdAt'
            return !("createdAt" in dog);
          } else if (action.payload === "DB") {
            // Filtrar los datos que tienen la propiedad 'createdAt'
            return "createdAt" in dog;
          } else {
            return true; // No se aplica ningún filtro
          }
        });
      
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


      case "GET_NAME":
      return {
        ...state,
        dogs: action.payload, 
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

        case 'ADD_NEW_DOG':
      return {
        ...state,
        dogs: [...state.dogs, action.payload],
      };

    default:
      return state;
  }
};

export default rootReducer;