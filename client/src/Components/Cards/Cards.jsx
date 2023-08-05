/* import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cards.module.css';

const Card = ({ dog }) => {
  const { id, name, image, weight, temperament } = dog;
  const weightMetric = weight.metric.split(' - ');

  return (
    <div className={styles.card}>
      <Link to={`/dog/${id}`}>
        <img src={image.url} alt={name} />
        <h2>{name}</h2>
        <p>
          Weight: {weightMetric[0]} - {weightMetric[1]} kg
        </p>
        <p>Temperament: {temperament}</p>
      </Link>
    </div>
  );
};

export default Card; */
import React from "react";
import style from "./Cards.module.css";

const Card = ({ dog }) => {
  return (
    <a href={`dog/${dog.id}`} className={style.cardLink}>
      <div className={style.card}>
        <div className={style.imageContainer}>
          <img src={dog.image} alt={dog.name} />
        </div>
        <h2>{dog.name}</h2>
        <p>{`Weight: ${dog.weight.metric} kg`}</p>
        <p>{`Temperament: ${dog.temperament}`}</p>
      </div>
    </a>
  );
};

export default Card;
