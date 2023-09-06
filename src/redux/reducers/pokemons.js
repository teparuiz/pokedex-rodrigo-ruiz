import { SET_POKEMON } from "../types";

const pokemons = (state = [], action) => {
  switch (action.type) {
    case SET_POKEMON: {
      const { data } = action;
      return data;
    }
    default: {
      return state;
    }
  }
};

export default pokemons;
