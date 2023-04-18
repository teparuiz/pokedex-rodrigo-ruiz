import React, { useState } from "react";
import style from "../../style/components/details.module.css";

function Gallery(props) {
  const { uniqPokemon } = props;
  const [index, setIndex] = useState(0);

  let hasPrev = index > 0;
  let hasNext = index < uniqPokemon?.sprites?.front_default.length - 1;

  if (!hasNext && index !== 0) {
    // Si llega al último índice, reiniciar la galería
    setIndex(0);
    hasNext = true;
  }

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

  const images = [
    { src: uniqPokemon?.sprites?.front_default, alt: uniqPokemon.sprites },
    { src: uniqPokemon?.sprites?.front_shiny, alt: uniqPokemon.sprites },
    {
      src: uniqPokemon?.sprites?.other?.home?.front_default,
      alt: uniqPokemon.sprites,
    },
    {
      src: uniqPokemon?.sprites?.other?.dreamworld?.front_default,
      alt: uniqPokemon.sprites,
    },
  ];

  return (
    <div className={style.pokemon_view}>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {images.map((image, i) => (
            <div
              key={i}
              className={`carousel-item ${
                index === i ? "active" : ""
              } text-center`}
            >
              <div className="d-block w-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className={`${style.carousel_control} carousel-control-prev`}
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
          className={`${style.carousel_control} carousel-control-next`}
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
  );
}

export default Gallery;
