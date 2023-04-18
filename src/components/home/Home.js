import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "../Pagination/Pagination";
import ModalShiny from "../modal/ModalShiny";

function Home(props) {
  const { itsLogged = false } = props;
  const [pokemon, setPokemon] = useState([]);
  const [scroll, setScroll] = useState(20);
  const [limit, setLimit] = useState(5);
  const [pokemonId, setPokemonId] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokeCard, setPokeCard] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [shiny, setShiny] = useState([]);
  const [scrollPokemon, setScrollPokemon] = useState([]);
  // const [openShiny, setOpenShiny] = useState({ visible: false, data: false });

  // const onClose = ()=> {
  //   setOpenShiny({visible: false, data: false})
  // }
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

  useEffect(() => {
    _getPokemon(currentPage);
  }, [currentPage]);

  const _getScrollPokemon = async (page) => {
    try {
      const newOffset = (page - 1) * scroll;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${scroll}&offset=${newOffset}`
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
      setScrollPokemon(pokemonData.slice(0, scroll));
    } catch (error) {
      console.error("Error al obtener los datos de los Pokemon", error);
    }
  };

  const loadMorePokemon = async () => {
    try {
      const newOffset = scroll;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${scroll}&offset=${newOffset}`
      );
      const data = await response.json();
      const pokemonUrls = data.results.map(
        (item) => `https://pokeapi.co/api/v2/pokemon/${item.name}`
      );
      const pokemonResponses = await Promise.all(
        pokemonUrls.map((url) => fetch(url))
      );
      const pokemonData = await Promise.all(
        pokemonResponses.map((response) => response.json())
      );
      setScrollPokemon((prevScrollPokemon) => [
        ...prevScrollPokemon,
        ...pokemonData,
      ]);
    } catch (error) {
      console.error("Error al obtener los datos de los Pokemon", error);
    }
  };

  useEffect(() => {
    _getScrollPokemon();
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
                <th scope="col" className="pt-4 pb-4">
                  #
                </th>
                <th scope="col" className="pt-4 pb-4">
                  Nombre
                </th>
                <th scope="col" className="pt-4 pb-4">
                  Vista previa
                </th>
                <th scope="col" className="pt-4 pb-4">
                  Tipos
                </th>
                <th scope="col" className="pt-4 pb-4">
                  Habilidades
                </th>
                <th
                  scope="col"
                  className="bg-white"
                  style={{ border: "0" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {pokemonId
                .filter((item) =>
                  item.name.includes(searchPokemon.toLowerCase())
                )
                .map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 1 ? "table-light" : ""}
                  >
                    <td scope="row" className="align-middle">
                      <Link to={`/details/${item.name}`}>{item.id}</Link>
                    </td>
                    <td scope="row" className="align-middle">
                      <Link to={`/details/${item.name}`}>
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </Link>
                    </td>
                    <td scope="row" className="align-middle">
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
                    <td scope="row" className="align-middle">
                      {item.types.map((type, index) => (
                        <span
                          key={index}
                          style={{ marginRight: "5px", display: "block" }}
                        >
                          {type.type.name.charAt(0).toUpperCase() +
                            type.type.name.slice(1)}
                        </span>
                      ))}
                    </td>
                    <td scope="row" className="align-middle">
                      {item.abilities.map((ability, index) => (
                        <span
                          key={index}
                          style={{
                            marginRight: "5px",
                            display: "block",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {ability.ability.name.charAt(0).toUpperCase() +
                            ability.ability.name.slice(1)}
                        </span>
                      ))}
                    </td>
                    <td
                      className="bg-white align-middle"
                      style={{ border: "0" }}
                    >
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

                      {/* <button
                        className="btn btn-secondary"
                        onClick={() => {
                          setOpenShiny({ visible: true, data: item });
                        }}
                      >
                        Shiny
                      </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <InfiniteScroll
            dataLength={scrollPokemon.length} // This is important field to render the next data
            next={loadMorePokemon}
            hasMore={pokemon.length}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="container-sm">
              <div className="row">
                {scrollPokemon
                  .filter((item) =>
                    item.name.includes(searchPokemon.toLowerCase())
                  )
                  .map((item, index) => (
                    <div
                      key={item.id}
                      className="col-xs-3 col-md-6 col-lg-3 col-12"
                    >
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
      {/* <ModalShiny
        openShiny={openShiny.visible}
        data={openShiny.data}
      /> */}
    </div>
  );
}

export default Home;
