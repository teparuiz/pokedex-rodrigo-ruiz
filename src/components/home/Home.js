import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "../Pagination/Pagination";

function Home(props) {
  const { itsLogged = false } = props;
  const [pokemon, setPokemon] = useState([]);
  const [scroll, setScroll] = useState(100);
  const [limit, setLimit] = useState(5);
  const [pokemonId, setPokemonId] = useState([]);
  const [details, setDetails] = useState({ data: false });
  const [searchPokemon, setSearchPokemon] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokeCard, setPokeCard] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [shiny, setShiny] = useState([]);
  const [scrollPokemon, setScrollPokemon] = useState([]);
  const [saveScrollPokemon, setSaveScrollPokemon] = useState([]);

  const _getPokemon = async (page) => {
    try {
      const newOffset = (page - 1) * limit;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`
      );
      const data = await response.json();
      setPokemon(data.results);
      const pokemonUrls = data.results.map(
        (item) => `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );
      const pokemonResponses = await Promise.all(
        pokemonUrls.map((url) => fetch(url))
      );
      const pokemonData = await Promise.all(
        pokemonResponses.map((response) => response.json())
      );
      setPokemonId(pokemonData);
      setTotalPages(Math.ceil(data.count / limit));
    } catch (error) {
      console.error("Error al obtener los datos de los Pokemon", error);
    }
  };

  const hasMorePokemon = async () => {
    try {
      const newOffSet = scroll;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffSet}`
      );
      const data = await response.json();
      setScrollPokemon(data.results);
      const pokemonUrls = data.results.map(
        (item) => `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );
      const pokemonResponses = await Promise.all(
        pokemonUrls.map((url) => fetch(url))
      );
      const pokemonData = await Promise.all(
        pokemonResponses.map((response) => response.json())
      );
      setSaveScrollPokemon(pokemonData);
    } catch (error) {
      console.error("Error al obtener los datos de los Pokemon", error);
    }
  };

  useEffect(() => {
    _getPokemon(currentPage);
  }, [currentPage]);

  useEffect(() => {
    hasMorePokemon();
  }, []);

  return (
    <div>
      <div className="container">
        <h1> Pokédex </h1>
        <div className="d-flex justify-content-between mb-2">
          <input
            className="form-control me-2 w-50"
            type="text"
            value={searchPokemon}
            onChange={(e) => setSearchPokemon(e.target.value)}
            placeholder="Buscar pokémon"
          />
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => setPokeCard(false)}
            >
              Lista
            </button>
            <button
              className="btn btn-outline-secondary ms-2"
              onClick={() => setPokeCard(true)}
            >
              Cuadrícula
            </button>
          </div>
        </div>
        {!pokeCard ? (
          <table className="table table-hover">
            <thead>
              <tr className="table-success">
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Vista previa</th>
                <th scope="col">Tipos</th>
                <th scope="col">Habilidades</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pokemonId
                .filter((item) =>
                  item.name.includes(searchPokemon.toLowerCase())
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td scope="row">
                      <Link to={`/details/${item.name}`}>{item.id}</Link>
                    </td>
                    <td scope="row">
                      <Link to={`/details/${item.name}`}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Link>
                    </td>
                    <td scope="row">
                      {!shiny[index] ? (
                        <img
                          src={item.sprites.front_default}
                          alt="Front Default"
                          className="img-fluid"
                        />
                      ) : (
                        <img
                          src={item.sprites.front_shiny}
                          alt="Front Shiny"
                          className="img-fluid"
                        />
                      )}
                    </td>
                    <td scope="row">
                      {item.types.map((type, index) => (
                        <span key={index}>
                          {type.type.name.charAt(0).toUpperCase() +
                            type.type.name.slice(1)}
                        </span>
                      ))}
                    </td>
                    <td scope="row">
                      {item.abilities.map((ability, index) => (
                        <span key={index}>
                          {ability.ability.name.charAt(0).toUpperCase() +
                            ability.ability.name.slice(1)}
                        </span>
                      ))}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setShiny((prevShinyList) => {
                            const newShinyList = [...prevShinyList];
                            newShinyList[index] = !prevShinyList[index];
                            return newShinyList;
                          });
                        }}
                      >
                        {shiny[index] ? "Normal" : "Shiny"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <InfiniteScroll
            dataLength={pokemonId.length}
            next={hasMorePokemon}
            style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            inverse={true} //
            hasMore={true}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            <div className="container-sm">
              <div className="row">
                {pokemonId
                  .filter((item) =>
                    item.name.includes(searchPokemon.toLowerCase())
                  )
                  .map((item, index) => (
                    <div key={item.id} className="col-xs-3 col-md-3 col-3">
                      <Card
                        data={item}
                        shiny={shiny[index]}
                        getShiny={() => {
                          setShiny((prevShinyList) => {
                            const newShinyList = [...prevShinyList];
                            newShinyList[index] = !prevShinyList[index];
                            return newShinyList;
                          });
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </InfiniteScroll>
        )}
        {!pokeCard ? (
          <Pagination
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
