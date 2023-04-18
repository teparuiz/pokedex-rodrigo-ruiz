import React, { useState, useEffect } from "react";
import style from "../../style/components/details.module.css";
import { useParams } from "react-router-dom";
import Gallery from "../Gallery/Gallery";

function Details(props) {
  const [uniqPokemon, setUniqPokemon] = useState([]);
  const [descriptionPokemon, setDescriptionPokemon] = useState([]);
  const [attackPokemon, setAttackPokemon] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    _getIndividualPokemon();
    _getDescription();
    _getAttack();
  }, []);

  const _getIndividualPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}` // Utiliza el valor de name en la URL de la API
      );
      const data = await response.json();
      setUniqPokemon(data);
    } catch (error) {
      console.error("Error al obtener los datos del pokémon", error);
    }
  };

  const _getDescription = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${uniqPokemon?.id}`
      );
      const data = await response.json();
      setDescriptionPokemon(data);
    } catch (error) {
      console.error("Error al obtener las descripciones");
    }
  };

  const _getAttack = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${uniqPokemon?.id}`
      );
      const data = await response.json();
      const moves = data.moves.slice(0, 10);
      const movesData = await Promise.all(
        moves.map(async (move) => {
          const moveResponse = await fetch(move.move.url);
          const moveData = await moveResponse.json();
          return moveData;
        })
      );
      setAttackPokemon(movesData);
    } catch (error) {
      console.error("Error al obtener los movimientos");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col col-12 pt-4 d-flex align-items-center justify-content-center">
            <Gallery uniqPokemon={uniqPokemon} />
          </div>
        </div>
        <div className="d-flex justify-content-between pt-2">
          <div className="d-flex flex-column col-7">
            <div className={style.pokemon_container}>
              <div className="d-flex align-items-center justify-content-between">
                <p className="align-middle">
                  <b>
                    {uniqPokemon?.name?.charAt(0).toUpperCase() +
                      uniqPokemon?.name?.slice(1)}
                  </b>
                </p>
                {uniqPokemon &&
                  uniqPokemon?.types?.map((item, index) => (
                    <span key={index} className={`${style.type} align-middle`}>
                      {item.type?.name?.charAt(0).toUpperCase() +
                        item.type?.name?.slice(1)}
                    </span>
                  ))}
              </div>
              <p>
                {`Descripción: ${
                  descriptionPokemon?.flavor_text_entries?.map(
                    (item) => item.flavor_text
                  )[26]
                }`}
              </p>
            </div>
            <div className={style.pokemon_container}>
              <p>Habilidades:</p>
              {uniqPokemon &&
                uniqPokemon?.abilities?.map((item, index) => (
                  <span
                    key={index}
                    className={`${style.type} align-middle d-flex justify-content-between align-items-center`}
                  >
                    {item.ability?.name?.charAt(0).toUpperCase() +
                      item.ability?.name?.slice(1)}
                  </span>
                ))}
            </div>
          </div>

          <div className="col-5">
            <div className={style.pokemon_info}>
              <p>Movimientos</p>
              {uniqPokemon &&
                uniqPokemon?.moves?.slice(0, 10).map((item) => {
                  const moveData = attackPokemon.find(
                    (move) => move.name === item.move.name
                  );
                  return (
                    <div key={item.move.name}>
                      <span>
                        <b>
                          {item.move?.name?.charAt(0).toUpperCase() +
                            item.move?.name?.slice(1)}
                        </b>
                      </span>
                      <div className="row">
                        <div className="col-4">
                          Poder <br />
                          {moveData?.power || 0}
                        </div>
                        <div className="col-4">
                          Precisión {moveData?.accuracy || 0}
                        </div>
                        <div className="col-4">Tipo {moveData?.type?.name}</div>
                      </div>
                      <div className={style.divider_movements}></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
