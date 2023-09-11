import { SET_ONEPOKEMON, SET_POKEMON } from "../types";

const initialState = [];

const pokemons = (state = initialState, action) => {
  switch (action.type) {
    case SET_POKEMON: {
      const { data } = action;
      return data;
    }
    case SET_ONEPOKEMON: {
      const { onePokemon } = action;
      return onePokemon;
    }
    default: {
      return state;
    }
  }
};

export default pokemons;
