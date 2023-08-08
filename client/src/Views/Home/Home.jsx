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
     // eslint-disable-next-line
    const [searchSuggestions, setSearchSuggestions] = useState([]);
     // eslint-disable-next-line
    const [showSuggestions, setShowSuggestions] = useState(false);
    
  
    useEffect(() => {
      dispatch(getAllDogs());
      dispatch(getTemperaments());
    }, [dispatch]);

     // eslint-disable-next-line
    const [searchError, setSearchError] = useState(false);
     // eslint-disable-next-line
    const [errorMessage, setErrorMessage] = useState("");
  
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
    
     // eslint-disable-next-line
    const handleOriginFilterChange = (e) => {
      setOriginFilter(e.target.value);
      setCurrentPage(1); 
    };
  
     const filteredDogs = originFilter === "Todos" ? allDogs : allDogs.filter((dog) => dog.origin === originFilter);
  const currentDogs = filteredDogs.slice(firstIndex, lastIndex);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
    
     // eslint-disable-next-line
    const handleSearchInputChange = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      const suggestions = []; // Falta implementar sugerencias 
      setSearchSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      );
      setShowSuggestions(true);
    };
  


     // eslint-disable-next-line
     const handleSearchSubmit = async (e) => {
      e.preventDefault();
    
      const response = await dispatch(getName(searchTerm));
    
      if (response && response.payload && response.payload.error) {
        setSearchError(true);
        setErrorMessage(response.payload.error);
      } else {
        setSearchError(false);
        setErrorMessage("");
      }
    
      setShowSuggestions(false);
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
        {searchError && <p className={style.error_message}>{errorMessage}</p>}

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
      </div>
    </>
  );
}

