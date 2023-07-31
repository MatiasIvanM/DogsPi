import React from "react";
import {Link} from 'react-router-dom';
import styles from './landing.module.css'

export default function Landing () {
    return (
        <div className={styles.landingImg}>
          <image src={styles.landing}>
          <div className={styles.title}>
            <h1>Welcome to my Woof! </h1>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <button className={styles.btn_home}> Woof! Woof! </button>
          </Link>
          </div>
        </image>
      </div>
    )
};