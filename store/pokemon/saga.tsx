import { takeEvery, fork, put, all, call, select } from "redux-saga/effects";
// Login Redux States
import {
	FETCH_POKEMONS,
	FETCH_POKEMONS_SUCCESS,
	FETCH_POKEMONS_ERROR,
	FETCH_POKEMON_BY_NAME,
	FETCH_POKEMON_BY_NAME_SUCCESS,
	FETCH_POKEMON_BY_NAME_ERROR,
} from "./actionTypes";

//Include Both Helper File with needed methods
import request from "../../services/client";
import { BASE_API_URL, POKEMON_URL } from "constants/urls";

const successCodes = [200, 201, 204];

async function apiRequest(authParams) {
	const { url, data, isAuthNeeded, method } = authParams;
	const response = await request(isAuthNeeded, method, {
		url,
		data,
	});

	return response;
}

function* fetchPokemons(actions) {
	const { offset, limit } = actions.payload;

	let requestPayload = {
		url: `${POKEMON_URL}?offset=${encodeURIComponent(
			offset
		)}&limit=${encodeURIComponent(limit)}`,
		method: "get",
		isAuthNeeded: false,
	};

	try {
		let oldPokemons = yield select((state) => state.Pokemon.pokemons);
		let response = yield call(apiRequest, requestPayload);
		let { data } = response;

		let pokemonDetails = yield all(
			data.results.map((pokemon) => {
				let pokemonUrl = pokemon.url.split(`${BASE_API_URL}`)[1];

				let pokemonRequestPayload = {
					url: `${pokemonUrl}`,
					method: "get",
					isAuthNeeded: false,
				};
				return call(apiRequest, pokemonRequestPayload);
			})
		);

		data.results = data.results.map((pokemon, index) => {
			pokemon.details = pokemonDetails[index].data;
			return pokemon;
		});

		let pokemons = [];

		if (offset > 0) {
			pokemons = [...oldPokemons, ...data.results];
		} else {
			pokemons = data.results;
		}

		data.results = pokemons;

		data.offset = offset + limit;
		data.limit = limit;

		yield put({ type: FETCH_POKEMONS_SUCCESS, payload: data });
	} catch (error) {
		yield put({
			type: FETCH_POKEMONS_ERROR,
			payload: `Error in fetching pokemons`,
		});
	}
}

function* fetchPokemonByName(actions) {
	const { name } = actions.payload;

	let requestPayload = {
		url: `${POKEMON_URL}${encodeURIComponent(name.toLowerCase())}`,
		method: "get",
		isAuthNeeded: false,
	};

	try {
		let oldPokemons = yield select((state) => state.Pokemon.pokemons);
		let response = yield call(apiRequest, requestPayload);
		let { data } = response;

		let pokemon = {
			name: data.name,
			url: `${BASE_API_URL}${POKEMON_URL}${data.id}`,
			details: data,
		};
		oldPokemons.push(pokemon);

		let payload = {
			results: oldPokemons,
			searchText: name,
		};

		let savedPokemons: any = JSON.parse(localStorage.getItem("pokemons")) || [];

		if (savedPokemons.indexOf(name) === -1) {
			if (savedPokemons.length >= 5) {
				savedPokemons.shift();
			}

			savedPokemons.push(name);
			localStorage.setItem("pokemons", JSON.stringify(savedPokemons));
		}

		yield put({ type: FETCH_POKEMON_BY_NAME_SUCCESS, payload });
	} catch (error) {
		yield put({
			type: FETCH_POKEMON_BY_NAME_ERROR,
			payload: { error: `Error in fetching pokemons`, searchText: name },
		});
	}
}

export function* watchFetchPokemons() {
	yield takeEvery(FETCH_POKEMONS, fetchPokemons);
}

export function* watchFetchPokemonByName() {
	yield takeEvery(FETCH_POKEMON_BY_NAME, fetchPokemonByName);
}

function* pokemonSaga() {
	yield all([fork(watchFetchPokemons), fork(watchFetchPokemonByName)]);
}

export default pokemonSaga;
