import axios from "axios";
import { SET_ONEPOKEMON } from "../types";

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
          data: response
        });
        resolve(response.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};
