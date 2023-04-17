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
          <div className="col-12">
            <div className="container mb-2">
              <Galery uniqPokemon={uniqPokemon} />
              <div className="row mt-2">
                <div className="col-7">
                  <div className={style.pokemon_info}>
                    <p>{uniqPokemon?.name}</p>
                    {uniqPokemon &&
                      uniqPokemon?.types?.map((item) => (
                        <p>{item.type.name}</p>
                      ))}
                    <p>Descripción</p>
                    <p> sgwsmsmbvmslfbvmlsmblsfdmbmfsmsfmvspfsv</p>
                  </div>
                </div>

                <div className="col-5">
                  <div className={style.pokemon_info}>
                    <p>Movimientos</p>
                    <div>
                      {uniqPokemon &&
                        uniqPokemon?.moves?.slice(0, 4).map((item) => (
                          <div key={item.move.name}>
                            <span>{item.move.name}</span>
                            <div className="row">
                              <div className="col-4"></div>
                              <div className="col-4">Precisión</div>
                              <div className="col-4">Tipo</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-7 mt-2">
                  <div className={style.pokemon_info}>
                    <p>Habilidades</p>
                    {uniqPokemon &&
                      uniqPokemon?.abilities?.map((item) => (
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
