import React, { useState } from "react";
import style from "../../style/components/details.module.css";

function Galery(props) {
  const { uniqPokemon } = props;
  const [index, setIndex] = useState(0);

  let hasPrev = index > 0;
  let hasNext = index < uniqPokemon?.sprites?.front_default.length - 1;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    }
  }

  return (
    <div>
       <div className={style.pokemon_view}>
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div
              className={`carousel-item ${
                index === 0 ? "active" : ""
              } text-center`}
            >
              <div className="d-block w-100">
                <img
                  src={uniqPokemon?.sprites?.front_default}
                  alt={uniqPokemon.sprites}
                />
              </div>
            </div>
            <div
              className={`carousel-item ${
                index === 1 ? "active" : ""
              } text-center`}
            >
              <div className="d-block w-100">
                <img
                  src={uniqPokemon?.sprites?.back_default}
                  alt={uniqPokemon.sprites}
                />
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            onClick={handlePrevClick}
            disabled={!hasPrev}
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={handleNextClick}
            disabled={!hasNext}
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Galery;
