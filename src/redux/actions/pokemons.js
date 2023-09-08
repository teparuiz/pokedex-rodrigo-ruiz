import axios from "axios";
import { SET_POKEMON, SET_ONEPOKEMON } from "../types";

export const GET_POKEMONS = (page, limit) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const newOffset = (page - 1) * limit; // Corrige el cálculo de offset
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`,
      headers: {
        authorization: false,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: SET_POKEMON,
          data: data,
        });
        resolve(data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};


export const GET_ONEPOKEMON = (name) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/pokemon/${name}`,
      headers: {
        authorization: false,
      },
    })
      .then((response) => {
        dispatch({
          type: SET_ONEPOKEMON,
          onePokemon: response.data,
        });
        resolve(response.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

