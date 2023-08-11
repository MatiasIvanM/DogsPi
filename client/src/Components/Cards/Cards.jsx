/* import React from "react";
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
 */

import React from "react";
import style from "./Cards.module.css";

const Card = ({ dog }) => {
  const formattedTemperament = dog.temperament
    ? dog.temperament.split(", ").slice(0, 2).join(", ") + (dog.temperament.split(", ").length > 2 ? "..." : "")
    : "Unknown";

  return (
    <a href={`dog/${dog.id}`} className={style.cardLink}>
      <div className={style.card}>
        <div className={style.imageContainer}>
          <img src={dog.image} alt={dog.name} />
        </div>
        <h2>{dog.name}</h2>
        <p>{`Weight: ${dog.weight.metric || dog.weight.imperial} kg`}</p>
        <p>{`Temperament: ${formattedTemperament}`}</p>
      </div>
    </a>
  );
};

export default Card;
