import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import arrowLeft from "../../Components/Image/icons8-doble-izquierda-24.png";
import arrowRight from "../../Components/Image/icons8-doble-derecha-24.png";
import { useDispatch, useSelector } from "react-redux";
import { filterByOrigin, getName } from "../../Redux/Actions/actions"; 

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
  const [searchError, setSearchError] = useState(false);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const suggestions = [];
    setSearchSuggestions(
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
    );
    setShowSuggestions(true);
  };
   
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(getName(searchTerm));
      setSearchError(false); // Resetea el estado del error en caso de éxito
    } catch (error) {
      setSearchError(true); // Establece el estado del error en caso de error
      window.confirm("Your search was not found. Try something different or create a new breed.");
    }
    setShowSuggestions(false);
  };


  const handleOrderByWeightChange = (e) => {
    e.preventDefault();
    handleOrderByWeight(e.target.value);
  };

  const handleOriginFilterChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "API") {
      dispatch(filterByOrigin("API"));
    } else if (selectedValue === "DB") {
      dispatch(filterByOrigin("DB"));
    } else {
      dispatch(filterByOrigin(""));
    }
  };

  return (
    <nav className={style.nav}>
  <div className={style.header_left}>
    <Link to="/">
      <button className={style.button}>Landing Page</button>
    </Link>
  </div>
  <div className={style.header_right}>
    <Link to="/create">
      <button className={style.button_create_dog}>Add New Breed</button>
    </Link>
  </div>
  <div className={style.header_center}>
    <div className={style.pagination}>
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
  </div>
  <div className={style.header_left}>
    <div className={style.container_filters}>
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
        <option value="ASC">Ligthest First</option>
        <option value="DESC">Heavisest First</option>
      </select>

      <select onChange={handleFilterByTemperaments} defaultValue="">
        <option disabled value="">
          Temperaments
        </option>
        <option value="Todos">All</option>
        {allTemperaments?.map((temp) => (
          <option value={temp.name} key={temp.id}>
            {temp.name}
          </option>
        ))}
      </select>

      <select onChange={handleOriginFilterChange} value={originFilter}>
        <option value="Todos">All</option>
        <option value="API">API</option>
        <option value="DB">DB</option>
      </select>
    </div>
  </div>
  <div className={style.header_right}>
        <form onSubmit={handleSearchSubmit} className={style.searchForm}>
      <input
        type="text"
        placeholder="Search Breed..."
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
      <button className={style.button_create_dog /* quedo el estilo */} type="Search"> Search </button>
    </form>
  </div>
</nav>
)
};

export default NavBar;
