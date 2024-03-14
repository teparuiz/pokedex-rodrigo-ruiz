'use client';
import React, { useState, useEffect } from "react";
import style from "../../style/components/details.module.css";
import { useParams } from "react-router-dom";
import Gallery from "../Gallery/Gallery";


function Details(props) {
  const [uniqPokemon, setUniqPokemon] = useState([]);
  const [descriptionPokemon, setDescriptionPokemon] = useState([]);
  const [attackPokemon, setAttackPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams();

  useEffect(() => {
    _getIndividualPokemon();
  }, []);

  const _getIndividualPokemon = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}` // Utiliza el valor de name en la URL de la API
      );
      const data = await response.json();
      setUniqPokemon(data);
      const descriptionResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}`
      );
      const descriptionData = await descriptionResponse.json();
      setDescriptionPokemon(descriptionData);
      const attackResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${data.id}`
      );
      const attackData = await attackResponse.json();
      const moves = attackData.moves.slice(0, 10);
      const movesData = await Promise.all(
        moves.map(async (move) => {
          const moveResponse = await fetch(move.move.url);
          const moveData = await moveResponse.json();
          return moveData;
        })
      );
      setAttackPokemon(movesData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos del pokémon", error);
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
                <p className="align-middle capitalize">
                  <b>{uniqPokemon?.name}</b>
                </p>
                {uniqPokemon &&
                  uniqPokemon?.types?.map((item, index) => (
                    <span key={index} className={`${style.type} align-middle capitalize`}>
                      {item.type?.name}
                    </span>
                  ))}
              </div>
              <p>
                {isLoading
                  ? "Cargando..."
                  : `Descripción: ${
                      descriptionPokemon?.flavor_text_entries?.map(
                        (item) => item.flavor_text
                      )[26]
                    }`}
              </p>
            </div>
            <div className={style.pokemon_container}>
              <p>Habilidades:</p>
              {isLoading
                ? "Cargando..."
                : uniqPokemon &&
                  uniqPokemon?.abilities?.map((item, index) => (
                    <span
                      key={index}
                      className={`${style.type} align-middle d-flex justify-content-between align-items-center capitalize`}
                    >
                      {item.ability?.name}
                    </span>
                  ))}
            </div>
          </div>

          <div className="col-5">
            <div className={style.pokemon_info}>
              <p>Movimientos</p>
              {isLoading
                ? "Cargando..."
                : uniqPokemon &&
                  uniqPokemon?.moves?.slice(0, 10).map((item) => {
                    const moveData = attackPokemon.find(
                      (move) => move.name === item.move.name
                    );
                    return (
                      <div key={item.move.name}>
                        <span className="capitalize">
                          <b>
                            {item.move?.name}
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
                          <div className="col-4">
                            Tipo {moveData?.type?.name}
                          </div>
                        </div>
                        <div className={style.divider_movements}></div>
                      </div>
                    );
                  })}
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Details;
