import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import arrowLeft from "../../Components/Image/icons8-doble-izquierda-24.png";
import arrowRight from "../../Components/Image/icons8-doble-derecha-24.png";
import { useDispatch, useSelector } from "react-redux";
import { filterByOrigin, getName  } from "../../Redux/Actions/actions"; // Importamos la acción 'setOriginFilter'


const NavBar = ({
  currentPage,
  paginado,
  handleFilterByTemperaments,
  handleOrderByName,
  handleOrderByWeight,
  allTemperaments,
  currentDogs,
  dogsPerPage,
}) => {
  const dispatch = useDispatch();
  const originFilter = useSelector((state) => state.originFilter);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Aquí puedes hacer una llamada a una función que obtenga sugerencias de búsqueda según el valor actual del término de búsqueda (value).
    // Por ejemplo, puedes llamar a una función que haga una búsqueda en tu lista de razas de perros y devuelva sugerencias basadas en el término ingresado.
    // Aquí, solo simularé algunas sugerencias ficticias para propósitos de demostración.
    const suggestions = [];
    setSearchSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(getName(searchTerm)); 
    setShowSuggestions(false);
  };

  const handleOrderByWeightChange = (e) => {
    e.preventDefault();
    handleOrderByWeight(e.target.value); // Pasamos el valor seleccionado al llamar a handleOrderByWeight
  };
  

  const handleOriginFilterChange = (e) => {
    const selectedValue = e.target.value;
  
    if (selectedValue === "API") {
      dispatch(filterByOrigin("API")); // Acción para filtrar por origen API
    } else if (selectedValue === "DB") {
      dispatch(filterByOrigin("DB")); // Acción para filtrar por origen DB
    } else {
      dispatch(filterByOrigin("")); // Acción para mostrar todo (no filtrar por origen)
    }
  };

  return (
    <nav className={`${style.nav}`}>
      <Link to="/">
        <button className={style.button}>Landing Page</button>
      </Link>
      <div className={`${style.pagination}`}>
        <button
          onClick={() => paginado(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={arrowLeft} alt="Previous page" />
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => paginado(currentPage + 1)}
          disabled={currentDogs.length < dogsPerPage}
        >
          <img src={arrowRight} alt="Next page" />
        </button>
      </div>
      <div className={`${style.header_container_left}`}>
        <div className={`${style.header_left}`}>
          <div className={`${style.container_filters}`}>
            <select onChange={handleOrderByName} defaultValue="">
              <option disabled value="">
                Name
              </option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>

            <select onChange={handleOrderByWeightChange} defaultValue="">
              <option disabled value="">
                Weight
              </option>
              <option value="ASC">Liviano a Pesado</option>
              <option value="DESC">Pesado a Liviano</option>
            </select>

            <select onChange={handleFilterByTemperaments} defaultValue="">
              <option disabled value="">
                Temperaments
              </option>
              <option value="Todos">Todos</option>
              {allTemperaments?.map((temp) => (
                <option value={temp.name} key={temp.id}>
                  {temp.name}
                </option>
              ))}
            </select>

            <select onChange={handleOriginFilterChange} value={originFilter}>
              <option value="Todos">Todo</option>
              <option value="API">API</option>
              <option value="DB">DB</option>
            </select>
          </div>
        </div>
      </div>
      <div className={`${style.header_right}`}>
        <Link to="/create">
          <button className={`${style.button_create_dog}`}>Crear Raza</button>
        </Link>
      </div>
      <form onSubmit={handleSearchSubmit} className={style.searchForm}>
        <input
          type="text"
          placeholder="Buscar razas de perros..."
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        {showSuggestions && (
          <ul className={style.suggestionsList}>
            {searchSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        )}
        <button type="submit">Buscar</button>
      </form>
    </nav>
  );
};

export default NavBar;