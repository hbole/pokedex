import { FETCH_POKEMONS, FETCH_POKEMON_BY_NAME } from "./actionTypes";

export const fetchPokemons = (offset, limit) => {
	return {
		type: FETCH_POKEMONS,
		payload: { offset, limit },
	};
};

export const fetchPokemonByName = (name) => {
	return {
		type: FETCH_POKEMON_BY_NAME,
		payload: { name },
	};
};
