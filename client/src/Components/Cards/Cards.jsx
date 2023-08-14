/* 
import React, { useState } from "react";
import style from "./Cards.module.css";

const Card = ({ dog }) => {
  const formattedTemperament = dog.temperament
    ? dog.temperament.split(", ").slice(0, 2).join(", ") + (dog.temperament.split(", ").length > 2 ? "..." : "")
    : "Unknown";

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={`dog/${dog.id}`}
      className={`${style.cardLink} ${isHovered ? style.hovered : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={style.card}>
        <div className={style.imageContainer}>
          <img src={dog.image} alt={dog.name} />
        </div>
        <h2>{dog.name}</h2>
        {isHovered && (
          <div className={style.hoverDetails}>
            <p>{`Temperament: ${formattedTemperament}`}</p>
            <p>{`Weight: ${dog.weight.metric || dog.weight.imperial} kg`}</p>
          </div>
        )}
      </div>
    </a>
  );
};

export default Card; */

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
          <img
            src={dog.image}
            alt={dog.name}
            className={style.standardImage}
          />
        </div>
        <h2 className={style.cardTitle}>{dog.name}</h2>
        <div className={style.details}>
          {/* <p className = {style.detailText}>{`Id: ${dog.id}`}</p> */} {/* Render Id No me gusta como queda */}
          <p className={style.detailText}>{`Temperament: ${formattedTemperament}`}</p>
          <p className={style.detailText}>{`Weight: ${dog.weight.metric || dog.weight.imperial} kg`}</p>
          {/* <p className={style.detailText}>{`Height: ${dog.height.metric || dog.height.imperial} cm`}</p>
          <p className={style.detailText}>{`Life Span: ${dog.life_span} years`}</p> */}
        </div>
      </div>
    </a>
  );
};

export default Card;