import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { showDogDetails } from "../../Redux/Actions/actions";
import style from "./DogDetail.module.css";

const Detail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();


  useEffect(() => {
    dispatch(showDogDetails(id));
  }, [dispatch, id]);

  const details = useSelector((state) => state.details);
  const {
    name,
    height,
    weight,
    life_span,
    temperament,
    origin,
    image,
  } = details;

  return (
    <div className={style.breedDetails}>
      <div className={style.pageTop}>
        <Link to="/home">
          <button className={`${style.button_home} ${style.closeBtn}`}>Home</button>
        </Link>
      </div>
      <div className={style.detailContainer}>
        <h1 className={style.breedTitle}>{name}</h1>
        <div className={style.imageContainer}>
          <img src={image} alt={name} className={style.dogImage} />
        </div>
        <div className={style.breedInfo}>
          <div className={style.info_card}>
            <h3>{`Height: ${height?.metric}`}</h3>
          </div>
          <div className={style.info_card}>
            <h3>{`Weight: ${weight?.metric}`}</h3>
          </div>
          <div className={style.info_card}>
            <h3>{`Lifespan: ${life_span}`}</h3>
          </div>
          <div className={style.info_card}>
            <h3>Temperaments</h3>
            <ul className={style.list_container}>
              {temperament?.split(", ").map((t, index) => (
                <li key={index}>{t}</li>
              ))}
            </ul>
          </div>
          <div className={style.info_card}>
            <p>{`Origin: ${origin}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
