import React, { useState, useEffect } from "react";
import style from "../../style/components/details.module.css";
import { useParams } from "react-router-dom";
import Galery from "../Galery/Galery";

function Details(props) {
  const [uniqPokemon, setUniqPokemon] = useState([]);
  const { name } = useParams();

  const _getIndividualPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}` // Utiliza el valor de name en la URL de la API
      );
      const data = await response.json();
      console.log(data);
      setUniqPokemon(data);
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
          <div className="col col-12 pt-4 d-flex align-items-center justify-content-center">
            <Galery uniqPokemon={uniqPokemon} />
          </div>
        </div>
        <div className="d-flex justify-content-between pt-2">
          <div className="d-flex flex-column col-7">
            <div className={style.pokemon_container}>
              <div className="d-flex align-items-center justify-content-between">
                <p className="align-middle">{uniqPokemon?.name}</p>
                {uniqPokemon &&
                  uniqPokemon?.types?.map((item, index) => (
                    <span key={index} className={`${style.type} align-middle`}>
                      {item.type.name}
                    </span>
                  ))}
              </div>
              <p> Descripción: {uniqPokemon?.heigth}</p>
            </div>
            <div className={style.pokemon_container}>
              <p>Habilidades:</p>
              {uniqPokemon &&
                uniqPokemon?.abilities?.map((item, index) => (
                  <span key={index} className={`${style.type} align-middle`}>
                    {item.ability.name}
                  </span>
                ))}
            </div>
          </div>

          <div className="col-5">
            <div className={style.pokemon_info}>
              <p>Movimientos</p>
              <div>
                {uniqPokemon &&
                  uniqPokemon?.moves?.slice(0, 2).map((item) => (
                    <div key={item.move.name}>
                      <span>
                        <b>{item.move.name}</b>
                      </span>
                      <div className="row">
                        <div className="col-4">HP: {}</div>
                        <div className="col-4">Attack: {}</div>
                        <div className="col-4">Deffense: {}</div>{" "}
                      </div>
                      <div className={style.divider_movements}></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
