// viejo render sin navBar
/* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./home.module.css";
import Card from "../../Components/Cards/Cards";
import NavBar from "../../Components/NavBar/NavBard"; */
//import { Link } from "react-router-dom";
//import Paginate from "../../Components/Paginate/Paginate";
//import arrowLeft from "../../Components/Image/icons8-doble-izquierda-24.png";
//import arrowRight from "../../Components/Image/icons8-doble-derecha-24.png";

/* import {
  getAllDogs,
  getTemperaments,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from "../../Redux/Actions/actions";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [orden, setOrden] = useState("");

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByTemperaments = (e) => {
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  }; */

 /*  return (
    <>
      <header className={`${style.header}`}>
        <Link to="/">
          <button className={style.button}>Landing WOOF!</button>
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
                  Alphabetical order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <select onChange={handleOrderByWeight} defaultValue="">
                <option disabled value="">
                  Filter by weight
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
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
            </div>
          </div>
        </div>
        <div className={`${style.header_right}`}>
          <Link to="/create">
            <button className={`${style.button_add_dog}`}>CREATE DOG</button>
          </Link>
        </div>
      </header>

      <hr />

      <div className={style.main_container}>
        <div className={style.container_cards}>
          {currentDogs?.map((dog) => {
            return (
              <div className={`${style.container_card}`} key={dog.id}>
                <div>
                  <Card dog={dog} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ); */
  
  //este si va
/*   import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import style from "./home.module.css";
  import Card from "../../Components/Cards/Cards";
  import NavBar from "../../Components/NavBar/NavBar";
  import { getAllDogs, getTemperaments, filterByTemperament, orderByName, orderByWeightRange } from "../../Redux/Actions/actions";
  
  export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
  
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const lastIndex = currentPage * dogsPerPage;
    const firstIndex = lastIndex - dogsPerPage;
    const currentDogs = allDogs.slice(firstIndex, lastIndex);
  
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const [orden, setOrden] = useState("");
  
    useEffect(() => {
      dispatch(getAllDogs());
      dispatch(getTemperaments());
    }, [dispatch]);
  
    const handleFilterByTemperaments = (e) => {
      e.preventDefault();
      dispatch(filterByTemperament(e.target.value));
    };
  
    const handleOrderByName = (e) => {
      e.preventDefault();
      dispatch(orderByName(e.target.value));
      setOrden(`Ordenado ${e.target.value}`);
    };
  
    const handleOrderByWeightRange = (e) => {
      e.preventDefault();
      const weightRange = e.target.value.split("-").map((w) => parseInt(w.trim()));
      dispatch(orderByWeightRange({ min: weightRange[0], max: weightRange[1] }));
      setOrden(`Ordenado por peso en rango: ${e.target.value}`);
    };
  
    return (
      <>
        <NavBar
          currentPage={currentPage}
          paginado={paginado}
          handleFilterByTemperaments={handleFilterByTemperaments}
          handleOrderByName={handleOrderByName}
          handleOrderByWeightRange={handleOrderByWeightRange}
          allTemperaments={allTemperaments}
          currentDogs={currentDogs}
          dogsPerPage={dogsPerPage}
        />
  
        <hr />
  
        <div className={style.main_container}>
          <div className={style.container_cards}>
            {currentDogs?.map((dog) => {
              return (
                <div className={`${style.container_card}`} key={dog.id}>
                  <div>
                    <Card dog={dog} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
   */

  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import style from "./home.module.css";
  import Card from "../../Components/Cards/Cards";
  import NavBar from "../../Components/NavBar/NavBar";
  import { getAllDogs, getTemperaments, filterByTemperament, orderByName, orderByWeight, getName } from "../../Redux/Actions/actions";
  
  export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
  
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const lastIndex = currentPage * dogsPerPage;
    const firstIndex = lastIndex - dogsPerPage;
  
    const [originFilter, setOriginFilter] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    useEffect(() => {
      dispatch(getAllDogs());
      dispatch(getTemperaments());
    }, [dispatch]);
  
    const handleFilterByTemperaments = (e) => {
      e.preventDefault();
      const selectedTemperament = e.target.value;
        
      if (selectedTemperament === "Todos") {
        dispatch(filterByTemperament("Todos"));
      } else {
        dispatch(filterByTemperament(selectedTemperament));
      }
    };
  
    const handleOrderByName = (e) => {
      e.preventDefault();
      dispatch(orderByName(e.target.value));
    };
  
    const handleOrderByWeight = (order) => {
      if (order === "ASC") {
        const weightRange = "1-100";
        const weightOrder = weightRange.split("-").map((w) => parseInt(w.trim()));
        dispatch(orderByWeight({ min: weightOrder[0], max: weightOrder[1] }));
      } else if (order === "DESC") {
        const weightRange = "100-1";
        const weightOrder = weightRange.split("-").map((w) => parseInt(w.trim()));
        dispatch(orderByWeight({ min: weightOrder[0], max: weightOrder[1] }));
      }
    };
    
    const handleOriginFilterChange = (e) => {
      setOriginFilter(e.target.value);
      setCurrentPage(1); 
    };
  
    const filteredDogs = originFilter === "Todos" ? allDogs : allDogs.filter((dog) => dog.origin === originFilter);
    const currentDogs = filteredDogs.slice(firstIndex, lastIndex);
  
    const paginado = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleSearchInputChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      const suggestions = []; // Aquí deberías obtener las sugerencias reales
      setSearchSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowSuggestions(true);
    };
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      setShowSuggestions(false);
      dispatch(getName(searchTerm)); // Agregar la acción para búsqueda por nombre
    };
  
    return (
      <>
        <NavBar
          currentPage={currentPage}
          paginado={paginado}
          handleFilterByTemperaments={handleFilterByTemperaments}
          handleOrderByName={handleOrderByName}
          handleOrderByWeight={handleOrderByWeight}
          allTemperaments={allTemperaments}
          currentDogs={currentDogs}
          dogsPerPage={dogsPerPage}
          originFilter={originFilter}
        />
  
        <hr />
  
        <div className={style.main_container}>
          {originFilter === "DB" && currentDogs.length === 0 && (
            <p>No hay razas creadas en la base de datos local.</p>
          )}
  
          <div className={style.container_cards}>
            {currentDogs.map((dog) => (
              <div className={style.container_card} key={dog.id}>
                <div>
                  <Card dog={dog} />
                </div>
              </div>
            ))}
          </div>
  
          <form className={style.search_bar} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            <button type="submit">Buscar</button>
            {showSuggestions && (
              <ul className={style.search_suggestions}>
                {searchSuggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            )}
          </form>
        </div>
      </>
    );
  }