"use client";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Spinner from "teparuiz/components/form/Spinner";
import { GET_ONEPOKEMON } from "teparuiz/redux/actions/onePokemon";
import { GET_POKEMONS } from "teparuiz/redux/actions/pokemons";

const Home = (props) => {
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

  useEffect(() => {
    _getData();
  }, [currentPage, limit]);

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
    _getDataUri();
  }, [data]);
  if (isLoading) return <Spinner />;
  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
        {JSON.stringify(uri, null, 2)}
      </pre>
    </div>
  );
};

const MapStateToProps = ({ pokemons = [], onePokemon = [] }) => {
  return {
    data: pokemons,
    onePokemon: onePokemon.data,
  };
};

export default connect(MapStateToProps, { GET_POKEMONS, GET_ONEPOKEMON })(Home);
