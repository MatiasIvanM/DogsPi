/* import React from "react";
import { Fragment } from "react";
import styles from './home.module.css'
 import DogArea from "../../Components/DodArea/DogArea";
import SideBar from "../..//Components/SideBar/SideBar";
import NavBar from "../NavBar/NavBar"; 

export default function Home() {
  return (
    <Fragment>
      <div className={styles.mainContainer}>
       <NavBar /> 
        <SideBar />
        <DogArea />
      </div>
    </Fragment>
  );
} */

/* import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import style from './home.module.css';
import Card from '../../Components/Cards/Cards';
import Paginate from '../../Components/Paginate/Paginate'


import {
  getAllDogs,
  getTemperaments,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from '../../Redux/Actions/actions'
 */

/* export default function Home(){
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage;
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);


 const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
};
 
 const [orden, setOrden] = useState('');
  

 useEffect(()=>{
  dispatch(getAllDogs())
  dispatch(getTemperaments())
 }, [dispatch]);



 const handleFilterByTemperaments = (e) =>{
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
 };

 return (
  <>
    <header className={`${style.header}`}>
        <Link to="/">
          <button className={style.button}>Landing WOOF!</button> 
        </Link>
        <div className={`${style.pagination}`}>
      <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate
    </div>
      <div className={`${style.header_container_left}`}> 
        <div className={`${style.header_left}`}>
           <SearchBar />

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
       boton para agregar nuevos perros 
      <div className={`${style.header_right}`}>
        <Link to="/create">
          <button className={`${style.button_add_dog}`}>CREATE DOG</button>
        </Link>
      </div>
    </header>

    <hr />

    <div className={style.main_container}>
        <div className={style.container_cards}>
          {currentDogs?.map((dog) => { // Usa la variable dog en lugar de el para iterar sobre la lista
            return (
              <div className={`${style.container_card}`} key={dog.id}>
                <div>
                   Aquí utilizamos el componente Card 
                  <Card dog={dog} />
                </div>
              </div>
            )
          })}
        </div>
    
  </div>
  </>
);
}
 */


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import style from "./home.module.css";
import Card from "../../Components/Cards/Cards";
import Paginate from "../../Components/Paginate/Paginate";
import arrowLeft from "../../Components/Image/icons8-doble-izquierda-24.png";
import arrowRight from "../../Components/Image/icons8-doble-derecha-24.png";

import {
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
  };

  return (
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
  );
}