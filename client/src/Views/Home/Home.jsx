import React from "react";
import { Fragment } from "react";
import styles from './home.module.css'
import DogArea from "../../Components/DodArea/DogArea";
import SideBar from "../..//Components/SideBar/SideBar";
/* import NavBar from "../NavBar/NavBar"; */

export default function Home() {
  return (
    <Fragment>
      <div className={styles.mainContainer}>
       {/* <NavBar /> */}
        <SideBar />
        <DogArea />
      </div>
    </Fragment>
  );
}