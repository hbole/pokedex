import { all } from "redux-saga/effects";

//public
import PokemonSaga from "./pokemon/saga";

export default function* rootSaga() {
	yield all([PokemonSaga()]);
}
