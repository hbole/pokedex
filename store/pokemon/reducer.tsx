import {
	FETCH_POKEMONS,
	FETCH_POKEMONS_SUCCESS,
	FETCH_POKEMONS_ERROR,
	FETCH_POKEMON_BY_NAME,
	FETCH_POKEMON_BY_NAME_SUCCESS,
	FETCH_POKEMON_BY_NAME_ERROR,
} from "./actionTypes";

const initialState = {
	error: "",
	loading: false,
	count: 0,
	next: "",
	prev: "",
	offset: 0,
	limit: 25,
	searchText: "",
	pokemons: [],
};

const pokemon = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POKEMONS:
			state = {
				...state,
				loading: true,
				error: "",
			};
			break;
		case FETCH_POKEMONS_SUCCESS:
			state = {
				...state,
				error: "",
				loading: false,
				count: action.payload.count,
				next: action.payload.next,
				prev: action.payload.prev,
				offset: action.payload.offset,
				limit: action.payload.limit,
				pokemons: action.payload.results,
				searchText: "",
			};
			break;
		case FETCH_POKEMONS_ERROR:
			state = {
				...state,
				error: action.payload,
				loading: false,
				searchText: "",
			};
			break;

		case FETCH_POKEMON_BY_NAME:
			state = {
				...state,
				loading: true,
				error: "",
				next: "",
				prev: "",
				offset: 0,
				limit: 25,
				pokemons: [],
			};
			break;
		case FETCH_POKEMON_BY_NAME_SUCCESS:
			state = {
				...state,
				error: "",
				loading: false,
				pokemons: action.payload.results,
				searchText: action.payload.searchText,
			};
			break;

		case FETCH_POKEMON_BY_NAME_ERROR:
			state = {
				...state,
				error: action.payload.error,
				loading: false,
				searchText: action.payload.searchText,
			};
			break;

		default:
			state = { ...state };
			break;
	}
	return state;
};

export default pokemon;
