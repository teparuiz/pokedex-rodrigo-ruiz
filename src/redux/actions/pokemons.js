import axios from "axios";
import { SET_POKEMONS } from "../types";

export const GET_POKEMONS = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "",
      headers: {
        authorization: false,
      },
    })
      .then(({ data }) => {
        dispatch({
          type: SET_POKEMONS,
          data: data,
        });
        return resolve(data);
      })
      .catch((err) => console.error(reject, err));
  });
};
