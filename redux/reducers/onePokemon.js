import { SET_ONEPOKEMON } from "../types";

const initialState = [];

const onePokemon = (state = initialState, action) => {
  switch (action.type) {
    case SET_ONEPOKEMON: {
      const { data } = action;
      return data;
    }
    default: {
      return state;
    }
  }
};

export default onePokemon;
