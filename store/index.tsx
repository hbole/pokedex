import { createStore, applyMiddleware, Store } from "redux";
import createSagaMiddleware, { Task } from "redux-saga";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";

import rootReducer, { State } from "./reducers";
import rootSaga from "./sagas";

export interface SagaStore extends Store {
	sagaTask?: Task;
}

export const makeStore: MakeStore<State> = (context: Context) => {
	// 1: Create the middleware
	const sagaMiddleware = createSagaMiddleware();

	// 2: Add an extra parameter for applying middleware:
	const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

	// 3: Run your sagas on server
	(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

	// 4: now return the store:
	return store;
};

export const wrapper = createWrapper<State>(makeStore, { debug: true });
