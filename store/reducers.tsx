import { combineReducers, AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import Pokemon from "./pokemon/reducer";

export type State = {
	Pokemon: any;
};

const rootReducer = (state: State, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload;

		default: {
			const combineReducer = combineReducers({
				Pokemon,
			});
			return combineReducer(state, action);
		}
	}
};
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
