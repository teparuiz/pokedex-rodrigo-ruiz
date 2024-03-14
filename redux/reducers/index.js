import  {combineReducers}  from 'redux';
import pokemons from './pokemons'
import onePokemon from './onePokemon';

export default combineReducers({pokemons, onePokemon});