import React, { useState, useEffect } from "react";
import style from "../../style/components/details.module.css";
import { useParams } from "react-router-dom";

function Details(props) {
  const [uniqPokemon, setUniqPokemon] = useState([]);
  const { name } = useParams();

  const _getIndividualPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}` // Utiliza el valor de name en la URL de la API
      );
      const data = await response.json();
      setUniqPokemon(data)
    } catch (error) {
      console.error("Error al obtener los datos del pokémon", error);
    }
  };

  useEffect(() => {
    _getIndividualPokemon();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mb-2">
              <div className={style.pokemon_view}>
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active text-center">
                      <div className="d-block w-100">
                        <h1> Galería de Sprites </h1>
                      </div>
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
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
              <div className="row mt-2">
                <div className="col-7">
                  <div className={style.pokemon_info}>
                    <p>{uniqPokemon.name}</p>
                    {uniqPokemon.types.map((item) => (
                      <p>{item.type.name}</p>
                    ))}
                    <p>Descripción</p>
                  </div>
                </div>

                <div className="col-5">
                  <div className={style.pokemon_info}>
                    <p>Movimientos</p>
                    <div>
                      <span>Movimiento 1</span>
                      <div className="row">
                        <div className="col-4">
                        {uniqPokemon.moves.map((item) => (
                      <p>{item.move.name}</p>
                    ))}
                        </div>
                        <div className="col-4">Precisión</div>
                        <div className="col-4">Tipo</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-7 mt-2">
                  <div className={style.pokemon_info}>
                    <p>Habilidades</p>
                    {uniqPokemon.abilities.map((item) => (
                      <p>{item.ability.name}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
