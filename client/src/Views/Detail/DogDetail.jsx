/* import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showDogDetails } from "../../Redux/Actions/actions";
import { Link } from "react-router-dom";
import style from "./DogDetail.module.css";

export default function DogDetails() {
    const dispatch = useDispatch();
    let { id } = useParams();
    console.log("🚀 ~ Use params:", id)

    useEffect(() => {
        dispatch(showDogDetails(id));
        console.log("🚀 ~ useEffect ~ id:", id)
    }, [dispatch, id]);

    const details = useSelector((state) => state.details)
    console.log("🚀 ~ DogDetails ~ details:", details)
    // console.log(details);

    let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;

    if (details[0]) { //una vez ya se hayan traido los datos renderizalos
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) {
            temperamentDog = [...details[0].temperaments]
        }

        if (details[0].temperaments[0].name) {
            temperamentDog = details[0].temperaments.map(temp => temp.name)
        }
    };

    

    return(
        <div className={`${style.main_container}`}>
            <Link to="/home">
                <button className={`${style.button_home}`}>Home</button>
            </Link>
            <div className={`${style.sub_container}`}>
                    <div className={`${style.container_elements}`}>

                        <div className={`${style.image_container}`}>
                            <img src={imageDog} alt={`imagen de ${nameDog}`}/>
                        </div>
                        
                        <div className={`${style.right_container}`}>
                            <h1>{nameDog}</h1>
                            <h3>{`Height: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} CM`}</h3>
                            <h3>{`Weight: ${heightDog &&  weightDog[0]} - ${weightDog && weightDog[1]} KG`}</h3>
                            <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                            <div>
                                <h3>Temperaments</h3>
                                <ul className={`${style.list_container}`}>
                                    {temperamentDog.map(t => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                        </div>   
                </div>
            </div>
        </div>
    )
} */

/////////////////////////////////////////////////////////////////////////////////////////////
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
    reference_image_id,
  } = details;

  return (
    <div className={style.detail_container}>
      <Link to="/home">
        <button className={style.button_home}>Home</button>
      </Link>
      <div
        className={style.background_image}
        style={{ backgroundImage: `url("https://cdn2.thedogapi.com/images/${reference_image_id}.jpg")` }}
      />
      <div className={style.sub_container}>
        <div className={style.container_elements}>
          <div className={style.right_container}>
            <h1>{name}</h1>
            {/*<h2>{id}</h2>   RENDER ID NO ME GUSTA COMO QUEDA */}
            <h3>{`Height: ${height?.metric}`}</h3>
            <h3>{`Weight: ${weight?.metric}`}</h3>
            <h3>{`Lifespan: ${life_span}`}</h3>
            <div>
              <h3>Temperaments</h3>
              <ul className={style.list_container}>
                {temperament?.split(", ").map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <p>{`Origin: ${origin}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;