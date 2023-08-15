import React from "react";
import {Link} from 'react-router-dom';
import styles from './landing.module.css'

export default function Landing () {
    return (
        <div className={styles.landingImg}>
          <image src={styles.landing}>
          <div className={styles.title}>
            <h1>Welcome to my Woof! </h1>
            <p className = {styles.text}>
            "Welcome to my individual project at Henry, where i've crafted a unique Single Page Application (SPA)
            <p> centered around the fascinating world of dogs. </p>
            <p>Through the utilization of TheDogAPI,</p>
            <p>
            I've harnessed a vast  information to bring you comprehensive details about various dog breeds.</p>
            </p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <button className={styles.btn_home}> Let's Woof! </button>
          </Link>
          </div>
        </image>
      </div>
    )
};