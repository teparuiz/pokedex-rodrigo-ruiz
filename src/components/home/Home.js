import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Pagination from "../Pagination/Pagination";
import ModalShiny from "../modal/ModalShiny";
import { connect } from "react-redux";
import { GET_POKEMONS } from "../../redux/actions/pokemons";
import { GET_ONEPOKEMON } from "../../redux/actions/onePokemon";
import { HTTP } from "../../config/http";
import { handleError } from "../../config/utils";
import Spinner from "../form/Spinner";

const Home = (props) => {
  const { itsLogged = false } = props;

  const [isLoading, setIsLoading] = useState(true);

  const [limit, setLimit] = useState(10);
  const [searchPokemon, setSearchPokemon] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pokeCard, setPokeCard] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [scrollPokemon, setScrollPokemon] = useState([]);
  const [shiny, setShiny] = useState([]);
  const [visible, setVisible] = useState({ visible: false, data: false });

  const [data, setData] = useState([]);
  const [uri, setUri] = useState([]);

  const onClose = () => {
    setVisible({ visible: false, data: false });
  };

  const _getData = () => {
    props
      .GET_POKEMONS(currentPage, limit)
      .then((response) => {
        setData(response);
        setTotalPages(response.count);
        setIsLoading(false);
      })
      .catch((err) => {
        handleError(err);
        setIsLoading(false);
      });
  };

  const _getDataUri = async () => {
    try {
      const promises = (props.data?.results || []).map(async (item) => {
        try {
          const response = await props.GET_ONEPOKEMON(item.name);
          return response;
        } catch (err) {
          handleError(err);
          return null;
        }
      });

      const response = await Promise.all(promises);
      setUri(response);
    } catch (error) {
      console.error("Error al obtener datos de URIs:", error);
    }
  };

  useEffect(() => {
    _getData();
  }, [currentPage, limit]);
  
  useEffect(() => {
    _getDataUri();
  }, [data]);
  
  // const _loadMorePokemon = async () => {
  //   try {
  //     const promises = (props.data?.results || []).map(async (item) => {
  //       try {
  //         const response = await props.GET_ONEPOKEMON(item.name);
  //         return response;
  //       } catch (err) {
  //         handleError(err);
  //         return null;
  //       }
  //     });

  //     const response = await Promise.all(promises);

  //     // Calcular la nueva currentPage y totalPages
  //     const newCurrentPage = currentPage + 1; // Incrementar la página actual en 1
  //     const newTotalPages = Math.ceil(newCurrentPage * limit / 10); // Calcular el nuevo total de páginas

  //     // Actualizar currentPage y totalPages
  //     setCurrentPage(newCurrentPage);
  //     setTotalPages(newTotalPages);

  //     // Agregar los nuevos datos al estado existente en lugar de sobrescribirlo
  //     setScrollPokemon((prevState) => [...prevState, ...response]);
  //   } catch (error) {
  //     console.error("Error al obtener datos de URIs:", error);
  //   }
  // };

  if (isLoading) return <Spinner />;

  return (
    <>
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
                {uri
                  ?.filter((item) =>
                    item.name.includes(searchPokemon.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 1 ? "table-light" : ""}
                    >
                      <td className="align-middle">
                        <Link to={`/details/${item.name}`}>{item.id}</Link>
                      </td>
                      <td className="align-middle">
                        <Link to={`/details/${item.name}`}>
                          <p className="capitalize">{item.name}</p>
                        </Link>
                      </td>
                      <td className="align-middle">
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
                      <td className="align-middle">
                        {item.types.map((type, index) => (
                          <span
                            key={index}
                            className="capitalize"
                            style={{ marginRight: "5px", display: "block" }}
                          >
                            {type.type.name}
                          </span>
                        ))}
                      </td>
                      <td className="align-middle">
                        {item.abilities.map((ability, index) => (
                          <span
                            key={index}
                            className="capitalize"
                            style={{
                              marginRight: "5px",
                              display: "block",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {ability.ability.name}
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
                            setVisible({ visible: true, data: item });
                          }}
                        >
                          Shiny
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <InfiniteScroll
              dataLength={totalPages} // This is important field to render the next data
              next={() => alert("hola")}
              hasMore={currentPage < totalPages}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Upps!! ya viste todo </b>
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
                            setVisible({ visible: true, data: item });
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
              totalPages={totalPages / limit}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          ) : null}
        </div>
      </div>
      <ModalShiny show={visible.visible} onHide={onClose} data={visible.data} />
    </>
  );
};

const MapStateToProps = ({ pokemons = [], onePokemon = [] }) => {
  return {
    data: pokemons,
    onePokemon: onePokemon.data,
  };
};

export default connect(MapStateToProps, { GET_POKEMONS, GET_ONEPOKEMON })(Home);
