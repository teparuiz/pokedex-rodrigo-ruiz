import axios from "axios";
import { SET_POKEMON } from "../types";

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
