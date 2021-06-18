import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction, combineReducers } from 'redux';
import user, { IUserReducerState } from './user';

export interface State {
	user: IUserReducerState;
}

const rootReducer = (state: State | undefined, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE:
			console.log('HYDRATE', action);
			return action.payload;
		default: {
			const combinedReducer = combineReducers({
				user,
			});
			return combinedReducer(state, action);
		}
	}
};
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
