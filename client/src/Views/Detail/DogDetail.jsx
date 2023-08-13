
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showDogDetails } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";
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
    <div className={style.detail_container}>
      <Link to="/home">
        <button className={style.button_home}>Home</button>
      </Link>
      <div className={style.card}>
        <div className={style.grid_container}>
          <div className={style.image_container}>
            <img src={image} alt={name} className={style.image} />
          </div>
          <div className={style.data_container}>
            <h1>{name}</h1>
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
                {temperament?.split(", ").map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className={style.info_card}>
              <p>{`Origin: ${origin}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
    

export default Detail;