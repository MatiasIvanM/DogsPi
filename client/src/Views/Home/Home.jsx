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

import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import {
  getAllDogs,
  getTemperaments,
  filterByTemperament,
  orderByName,
  orderByWeight,
} from '../../Redux/Actions/actions'

import styles from './home.module.css'

export default function Home(){
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



 const handlerFilterByTemperaments = (e) =>{
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

 return(
  <>
    <header className="Header">
      <div className="toLand">
        <Link to = "/">
          <button>To Landing page Woof!</button>
        </Link>
        {/* Render de la nav con serach bar, crear comoponente, render de cards y control de las rutas del back */}

      </div>
    </header>

  </>
 )

}